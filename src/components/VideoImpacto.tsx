import { RevealItem, RevealSection } from "./RevealSection";

export function VideoImpacto() {
  return (
    <RevealSection className="relative overflow-hidden bg-tinta py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-luz-amarela/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <RevealItem>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">
            Assista
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
            A Deisi em movimento
          </h2>
        </RevealItem>

        <RevealItem delay={0.15} className="relative mt-12 w-full max-w-xs sm:max-w-sm">
          <div className="absolute -inset-5 rounded-[2.75rem] bg-amarelo/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-branco/15 bg-tinta shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <video
              src="/videos/deisi-video-impacto.mp4"
              controls
              playsInline
              preload="metadata"
              className="aspect-[9/16] w-full bg-tinta object-cover"
            >
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
