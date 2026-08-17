import { type FormEvent, useState } from "react";
import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { supabase } from "../lib/supabase";

// Zap da Deisi -- numero oficial da campanha.
const WHATSAPP_NUMERO = "5551993441838";
const WHATSAPP_LINK_DIRETO = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Olá! Vim através do site da Deisi Maranata e quero saber mais.",
)}`;

export function CTAFinal() {
  const [enviado, setEnviado] = useState(false);
  const [linkVoluntario, setLinkVoluntario] = useState(WHATSAPP_LINK_DIRETO);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("nome") || "").trim();
    const whatsapp = String(dados.get("whatsapp") || "").trim();
    const cidade = String(dados.get("cidade") || "").trim();

    // registra o acesso/lead no Supabase (nao bloqueia o fluxo se falhar)
    supabase
      ?.from("deisi_voluntarios")
      .insert({ nome, whatsapp, cidade })
      .then(({ error }) => {
        if (error) console.error("Erro ao salvar voluntario:", error.message);
      });

    const mensagem = [
      "Olá, Deisi! Quero ser voluntária(o) na campanha.",
      `Nome: ${nome}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      cidade && `Cidade: ${cidade}`,
    ]
      .filter(Boolean)
      .join("\n");

    const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    setLinkVoluntario(link);
    setEnviado(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <RevealSection id="apoiar" className="relative overflow-hidden bg-bordo py-24 md:py-32">
      <ZigzagPattern tone="light" />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-branco/20 blur-[100px]" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-bordo-escuro/50 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RevealItem>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">
            Vamos juntos
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] text-branco md:text-5xl">
            Cuidar das pessoas,
            <br /> transformar o Rio Grande
          </h2>
        </RevealItem>

        <RevealItem delay={0.15} className="mx-auto mt-10 max-w-lg">
          {enviado ? (
            <div className="rounded-2xl border border-branco/15 bg-branco/10 p-8">
              <p className="font-display text-lg font-bold text-branco">Quase lá! 💛</p>
              <p className="mt-2 text-sm text-branco/70">
                Abrimos o WhatsApp com sua mensagem pronta pra equipe da
                Deisi. Se não abriu automaticamente,{" "}
                <a href={linkVoluntario} target="_blank" rel="noopener noreferrer" className="font-semibold text-luz-amarela underline">
                  clique aqui pra enviar
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
              <input
                required
                name="nome"
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-branco/20 bg-branco/95 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-amarelo sm:col-span-2"
              />
              <input
                required
                name="whatsapp"
                type="tel"
                placeholder="WhatsApp"
                className="rounded-xl border border-branco/20 bg-branco/95 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-amarelo"
              />
              <input
                name="cidade"
                type="text"
                placeholder="Cidade"
                className="rounded-xl border border-branco/20 bg-branco/95 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-amarelo"
              />
              <button
                type="submit"
                className="rounded-xl bg-amarelo px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-tinta transition-transform hover:scale-[1.02] sm:col-span-2"
              >
                Quero ser voluntária(o)
              </button>
            </form>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP_LINK_DIRETO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-branco/25 bg-branco px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-bordo transition-transform hover:scale-105"
            >
              Zap da Deisi
            </a>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
