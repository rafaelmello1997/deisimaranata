import { useState } from "react";
import { RevealSection, RevealItem } from "./RevealSection";
import { Sticker } from "./Sticker";
import stickerBest from "../assets/stickers/sticker-the-best.png";
import { GaleriaLightbox } from "./GaleriaLightbox";
import { ZigzagPattern } from "./ZigzagPattern";
import { pickContent, useContent, useContentMap } from "../lib/SiteContentContext";

// Projetos reais do gabinete. Fotos em public/assets/projetos (ver src/data/projetosFotos.ts).
// "15 anos dos sonhos" ainda sem fotos recebidas.
const PROJETOS = [
  { nome: "Casa solidária e Lavanderia", key: "casa-solidaria", contentKey: "casa_solidaria", foto: "/assets/projetos/casa-solidaria-lavanderia-1.jpg" },
  { nome: "Rede empreendedora", key: "rede-empreendedora", contentKey: "rede_empreendedora", foto: "/assets/projetos/rede-empreendedora-1.jpg" },
  { nome: "Projeto Guarda-chuva", key: "guarda-chuva", contentKey: "guarda_chuva", foto: "/assets/projetos/projeto-guarda-chuva-1.jpg" },
  { nome: "Gurias incríveis", key: "gurias-incriveis", contentKey: "gurias_incriveis", foto: "/assets/projetos/gurias-incriveis-1.jpg" },
  { nome: "Casa do artesão", key: "casa-artesao", contentKey: "casa_artesao", foto: "/assets/projetos/casa-do-artesao-1.jpg" },
  { nome: "Varal solidário", key: "varal-solidario", contentKey: "varal_solidario", foto: "/assets/projetos/varal-solidario-1.jpg" },
  { nome: "Sala bem-me-quer", key: "sala-bem-me-quer", contentKey: "sala_bem_me_quer", foto: "/assets/projetos/sala-bem-me-quer-1.jpg" },
  { nome: "Doação gera impacto", key: "doacao-gera-impacto", contentKey: "doacao_gera_impacto", foto: "/assets/projetos/doacao-gera-impacto-1.jpg" },
  { nome: "15 anos dos sonhos", key: null, contentKey: null, foto: null },
];

const GRADIENTES = [
  "from-bordo to-bordo-escuro",
  "from-bordo-escuro to-tinta",
];

export function Projetos() {
  const [ativo, setAtivo] = useState<string | null>(null);
  const map = useContentMap();
  const eyebrow = useContent("projetos.eyebrow", "Realizações");
  const tituloLinha1 = useContent("projetos.titulo_linha1", "Projetos que já");
  const tituloLinha2 = useContent("projetos.titulo_linha2", "transformam vidas");
  const descricao = useContent(
    "projetos.descricao",
    "Iniciativas do gabinete que saem do papel e chegam na vida das famílias, das gurias e dos empreendedores da comunidade. Clique num card pra ver todas as fotos.",
  );

  return (
    <RevealSection id="projetos" className="relative overflow-hidden bg-bordo py-24 md:py-32">
      <ZigzagPattern tone="light" />
      <Sticker
        src={stickerBest}
        width={160}
        rotate={8}
        delay={0.3}
        className="absolute right-6 top-16 hidden opacity-90 lg:block lg:w-48"
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <RevealItem>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
              {tituloLinha1}
              <br className="hidden md:block" /> {tituloLinha2}
            </h2>
          </RevealItem>
          <RevealItem delay={0.1}>
            <p className="max-w-sm text-sm text-branco/60">{descricao}</p>
          </RevealItem>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((pFallback, i) => {
            const p = pFallback.contentKey
              ? {
                  ...pFallback,
                  nome: pickContent(map, `projetos.${pFallback.contentKey}.nome`, pFallback.nome),
                  foto: pickContent(map, `projetos.${pFallback.contentKey}.foto`, pFallback.foto ?? ""),
                }
              : pFallback;
            return (
            <RevealItem key={p.nome} delay={(i % 3) * 0.1}>
              <button
                type="button"
                disabled={!p.key}
                onClick={() => p.key && setAtivo(p.key)}
                className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-branco/10 text-left ${
                  p.key ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {p.foto ? (
                  <img
                    src={p.foto}
                    alt={p.nome}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      GRADIENTES[i % GRADIENTES.length]
                    } opacity-90 transition-transform duration-700 group-hover:scale-110`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/15 to-transparent" />
                {p.key && (
                  <span className="absolute right-4 top-4 rounded-full border border-branco/25 bg-tinta/50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-branco opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Ver fotos
                  </span>
                )}
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-display text-xl font-bold text-branco drop-shadow-md">
                    {p.nome}
                  </h3>
                </div>
              </button>
            </RevealItem>
            );
          })}
        </div>
      </div>

      <GaleriaLightbox projetoKey={ativo} onClose={() => setAtivo(null)} />
    </RevealSection>
  );
}
