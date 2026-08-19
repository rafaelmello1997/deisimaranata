import { type ChangeEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useSiteContentAdmin, type SiteContentRow } from "../../lib/SiteContentContext";

// ordem de exibicao no painel = ordem visual das secoes no site
const CONTENT_ORDER = [
  "header.cta",
  "hero.badge", "hero.cta_apoiar", "hero.cta_conhecer", "hero.foto",
  "quem_e.eyebrow", "quem_e.titulo", "quem_e.paragrafo_1", "quem_e.paragrafo_2", "quem_e.paragrafo_3", "quem_e.paragrafo_4", "quem_e.foto",
  "enchente.eyebrow", "enchente.titulo", "enchente.paragrafo_1", "enchente.paragrafo_2", "enchente.foto_1", "enchente.foto_2", "enchente.foto_3",
  "bandeiras.eyebrow", "bandeiras.titulo", "bandeiras.subtitulo",
  "bandeiras.01.titulo", "bandeiras.01.texto",
  "bandeiras.02.titulo", "bandeiras.02.texto",
  "bandeiras.03.titulo", "bandeiras.03.texto",
  "bandeiras.04.titulo", "bandeiras.04.texto",
  "bandeiras.05.titulo", "bandeiras.05.texto",
  "projetos.eyebrow", "projetos.titulo_linha1", "projetos.titulo_linha2", "projetos.descricao",
  "projetos.casa_solidaria.nome", "projetos.casa_solidaria.foto",
  "projetos.rede_empreendedora.nome", "projetos.rede_empreendedora.foto",
  "projetos.guarda_chuva.nome", "projetos.guarda_chuva.foto",
  "projetos.gurias_incriveis.nome", "projetos.gurias_incriveis.foto",
  "projetos.casa_artesao.nome", "projetos.casa_artesao.foto",
  "projetos.varal_solidario.nome", "projetos.varal_solidario.foto",
  "projetos.sala_bem_me_quer.nome", "projetos.sala_bem_me_quer.foto",
  "projetos.doacao_gera_impacto.nome", "projetos.doacao_gera_impacto.foto",
  "depoimentos.eyebrow", "depoimentos.titulo_linha1", "depoimentos.titulo_linha2",
  "depoimentos.video_1.legenda", "depoimentos.video_2.legenda", "depoimentos.video_3.legenda",
  "espaco.eyebrow", "espaco.titulo", "espaco.paragrafo_1", "espaco.paragrafo_2",
  "espaco.stat1_valor", "espaco.stat1_label", "espaco.stat2_valor", "espaco.stat2_label", "espaco.stat3_valor", "espaco.stat3_label",
  "espaco.foto_1", "espaco.foto_2",
  "galeria.eyebrow", "galeria.titulo_linha1", "galeria.titulo_linha2", "galeria.texto", "galeria.badge", "galeria.foto",
  "gerador_foto.eyebrow", "gerador_foto.titulo", "gerador_foto.texto",
  "figurinhas.eyebrow", "figurinhas.titulo", "figurinhas.texto",
  "cta_final.eyebrow", "cta_final.titulo_linha1", "cta_final.titulo_linha2", "cta_final.form_botao", "cta_final.whatsapp_botao", "cta_final.whatsapp_numero",
  "footer.badge", "footer.facebook_url", "footer.nome_legal_linha", "footer.cnpj_linha",
];

function ordemIndex(key: string) {
  const i = CONTENT_ORDER.indexOf(key);
  return i === -1 ? CONTENT_ORDER.length : i;
}

export function ConteudoEditor() {
  const { rows, loading, reload } = useSiteContentAdmin();
  const [valores, setValores] = useState<Record<string, string>>({});
  const [ocupado, setOcupado] = useState<Record<string, boolean>>({});
  const [salvo, setSalvo] = useState<Record<string, boolean>>({});
  const [erro, setErro] = useState<Record<string, string>>({});

  useEffect(() => {
    setValores(Object.fromEntries(rows.map((r) => [r.key, r.valor])));
  }, [rows]);

  function marcarSalvo(key: string) {
    setSalvo((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSalvo((s) => ({ ...s, [key]: false })), 2000);
  }

  async function salvarTexto(key: string) {
    if (!supabase) return;
    setOcupado((s) => ({ ...s, [key]: true }));
    setErro((s) => ({ ...s, [key]: "" }));
    const { error } = await supabase
      .from("site_content")
      .update({ valor: valores[key] ?? "", updated_at: new Date().toISOString() })
      .eq("key", key);
    setOcupado((s) => ({ ...s, [key]: false }));
    if (error) setErro((s) => ({ ...s, [key]: error.message }));
    else {
      marcarSalvo(key);
      reload();
    }
  }

  async function trocarImagem(key: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !supabase) return;
    setOcupado((s) => ({ ...s, [key]: true }));
    setErro((s) => ({ ...s, [key]: "" }));

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${key.replace(/\./g, "-")}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("site-images").upload(path, file);
    if (uploadError) {
      setOcupado((s) => ({ ...s, [key]: false }));
      setErro((s) => ({ ...s, [key]: uploadError.message }));
      return;
    }
    const { data } = supabase.storage.from("site-images").getPublicUrl(path);
    const { error } = await supabase
      .from("site_content")
      .update({ valor: data.publicUrl, updated_at: new Date().toISOString() })
      .eq("key", key);
    setOcupado((s) => ({ ...s, [key]: false }));
    if (error) setErro((s) => ({ ...s, [key]: error.message }));
    else {
      setValores((v) => ({ ...v, [key]: data.publicUrl }));
      marcarSalvo(key);
      reload();
    }
  }

  if (loading) {
    return <p className="mt-6 text-sm text-branco/60">Carregando conteúdo…</p>;
  }

  const ordenadas = [...rows].sort((a, b) => ordemIndex(a.key) - ordemIndex(b.key));
  const secoes: { nome: string; campos: SiteContentRow[] }[] = [];
  for (const row of ordenadas) {
    let grupo = secoes.find((s) => s.nome === row.secao);
    if (!grupo) {
      grupo = { nome: row.secao, campos: [] };
      secoes.push(grupo);
    }
    grupo.campos.push(row);
  }

  return (
    <div className="mt-6 space-y-4">
      {secoes.map((secao) => (
        <details
          key={secao.nome}
          className="group overflow-hidden rounded-2xl border border-branco/10 bg-branco/[0.03]"
        >
          <summary className="cursor-pointer select-none list-none px-5 py-4 text-sm font-bold uppercase tracking-wide text-branco marker:content-none">
            <span className="mr-2 inline-block transition-transform group-open:rotate-90">▸</span>
            {secao.nome}
            <span className="ml-2 text-xs font-normal normal-case text-branco/40">
              ({secao.campos.length} campo{secao.campos.length > 1 ? "s" : ""})
            </span>
          </summary>

          <div className="space-y-5 border-t border-branco/10 px-5 py-5">
            {secao.campos.map((campo) => (
              <div key={campo.key} className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-branco/60">
                  {campo.label}
                </label>

                {campo.tipo === "texto" ? (
                  <>
                    <textarea
                      value={valores[campo.key] ?? ""}
                      onChange={(e) => setValores((v) => ({ ...v, [campo.key]: e.target.value }))}
                      rows={campo.valor.length > 140 ? 4 : 2}
                      className="rounded-xl border border-branco/15 bg-tinta/60 px-3 py-2 text-sm text-branco outline-none focus:border-amarelo"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => salvarTexto(campo.key)}
                        disabled={ocupado[campo.key]}
                        className="w-fit rounded-full bg-amarelo px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-tinta disabled:opacity-50"
                      >
                        {ocupado[campo.key] ? "Salvando…" : "Salvar"}
                      </button>
                      {salvo[campo.key] && <span className="text-xs text-luz-amarela">Salvo ✓</span>}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      src={valores[campo.key] || campo.valor}
                      alt={campo.label}
                      className="h-20 w-20 rounded-lg border border-branco/15 object-cover"
                    />
                    <label className="w-fit cursor-pointer rounded-full border border-branco/25 px-4 py-2 text-xs font-bold uppercase tracking-wide text-branco hover:border-amarelo/60">
                      {ocupado[campo.key] ? "Enviando…" : "Trocar imagem"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={ocupado[campo.key]}
                        onChange={(e) => trocarImagem(campo.key, e)}
                      />
                    </label>
                    {salvo[campo.key] && <span className="text-xs text-luz-amarela">Salvo ✓</span>}
                  </div>
                )}

                {erro[campo.key] && <span className="text-xs text-red-400">{erro[campo.key]}</span>}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
