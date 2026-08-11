import { useState } from "react";
import { RevealSection, RevealItem } from "./RevealSection";
import { Sticker } from "./Sticker";
import stickerBest from "../assets/stickers/sticker-the-best.png";
import { GaleriaLightbox } from "./GaleriaLightbox";
import { ZigzagPattern } from "./ZigzagPattern";

// Projetos reais do gabinete. Fotos em public/assets/projetos (ver src/data/projetosFotos.ts).
// "15 anos dos sonhos" ainda sem fotos recebidas.
const PROJETOS = [
  { nome: "Casa solidária e Lavanderia", key: "casa-solidaria", foto: "/assets/projetos/casa-solidaria-lavanderia-1.jpg" },
  { nome: "Rede empreendedora", key: "rede-empreendedora", foto: "/assets/projetos/rede-empreendedora-1.jpg" },
  { nome: "Projeto Guarda-chuva", key: "guarda-chuva", foto: "/assets/projetos/projeto-guarda-chuva-1.jpg" },
  { nome: "Gurias incríveis", key: "gurias-incriveis", foto: "/assets/projetos/gurias-incriveis-1.jpg" },
  { nome: "Casa do artesão", key: "casa-artesao", foto: "/assets/projetos/casa-do-artesao-1.jpg" },
  { nome: "Varal solidário", key: "varal-solidario", foto: "/assets/projetos/varal-solidario-1.jpg" },
  { nome: "Sala bem-me-quer", key: "sala-bem-me-quer", foto: "/assets/projetos/sala-bem-me-quer-1.jpg" },
  { nome: "Doação gera impacto", key: "doacao-gera-impacto", foto: "/assets/projetos/doacao-gera-impacto-1.jpg" },
  { nome: "15 anos dos sonhos", key: null, foto: null },
];

const GRADIENTES = [
  "from-bordo to-bordo-escuro",
  "from-amarelo to-bordo",
  "from-luz-amarela to-amarelo",
  "from-bordo-escuro to-tinta",
];

export function Projetos() {
  const [ativo, setAtivo] = useState<string | null>(null);

  return (
    <RevealSection id="projetos" className="relative overflow-hidden bg-luz-amarela py-24 md:py-32">
      <ZigzagPattern tone="dark" />
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
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
              Realizações
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">
              Projetos que já
              <br className="hidden md:block" /> transformam vidas
            </h2>
          </RevealItem>
          <RevealItem delay={0.1}>
            <p className="max-w-sm text-sm text-tinta/60">
              Iniciativas do gabinete que saem do papel e chegam na vida das
              famílias, das gurias e dos empreendedores da comunidade. Clique
              num card pra ver todas as fotos.
            </p>
          </RevealItem>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((p, i) => (
            <RevealItem key={p.nome} delay={(i % 3) * 0.1}>
              <button
                type="button"
                disabled={!p.key}
                onClick={() => p.key && setAtivo(p.key)}
                className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-tinta/10 text-left ${
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
          ))}
        </div>
      </div>

      <GaleriaLightbox projetoKey={ativo} onClose={() => setAtivo(null)} />
    </RevealSection>
  );
}
