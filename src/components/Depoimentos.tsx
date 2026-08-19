import { RevealItem, RevealSection } from "./RevealSection";
import { Sticker } from "./Sticker";
import stickerBest from "../assets/stickers/sticker-the-best.png";
import { ZigzagPattern } from "./ZigzagPattern";
import { pickContent, useContent, useContentMap } from "../lib/SiteContentContext";

const DEPOIMENTOS = [
  {
    contentKey: "video_1",
    projeto: "Casa solidária",
    src: "/videos/depoimento-casa-solidaria.mp4",
  },
  {
    contentKey: "video_2",
    projeto: "Lavanderia solidária",
    src: "/videos/depoimento-lavanderia-solidaria.mp4",
  },
  {
    contentKey: "video_3",
    projeto: "Gurias incríveis",
    src: "/videos/depoimento-gurias-incriveis.mp4",
  },
];

export function Depoimentos() {
  const map = useContentMap();
  const eyebrow = useContent("depoimentos.eyebrow", "Quem viveu, conta");
  const tituloLinha1 = useContent("depoimentos.titulo_linha1", "Depoimentos de quem");
  const tituloLinha2 = useContent("depoimentos.titulo_linha2", "foi impactado");

  return (
    <RevealSection className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-bordo/10 blur-[110px]" />
      </div>
      <Sticker
        src={stickerBest}
        width={130}
        rotate={-10}
        delay={0.8}
        className="absolute left-6 top-10 hidden opacity-90 lg:block lg:w-40"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">
            {tituloLinha1}
            <br className="hidden md:block" /> {tituloLinha2}
          </h2>
        </RevealItem>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {DEPOIMENTOS.map((dFallback, i) => {
            const d = {
              ...dFallback,
              projeto: pickContent(map, `depoimentos.${dFallback.contentKey}.legenda`, dFallback.projeto),
            };
            return (
            <RevealItem key={d.src} delay={i * 0.1} className="relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-4 rounded-[2.25rem] bg-bordo/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-bordo/15 bg-bordo-escuro shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
                <video
                  src={d.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-[9/16] w-full bg-tinta object-cover"
                >
                  Seu navegador não suporta reprodução de vídeo.
                </video>
              </div>
              <span className="font-display mx-auto mt-4 block w-fit rounded-full bg-amarelo px-5 py-2 text-center text-sm font-extrabold uppercase tracking-wide text-tinta shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                {d.projeto}
              </span>
            </RevealItem>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
