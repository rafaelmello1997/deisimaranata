import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";

export function EspacoMaranata() {
  return (
    <RevealSection className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-bordo/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RevealItem>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
            Espaço Maranata
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">
            Parceria que transforma
          </h2>
        </RevealItem>

        <RevealItem delay={0.1} className="mt-8 space-y-4 text-[15px] leading-relaxed text-tinta/80 md:text-base">
          <p>
            Ao lado do meu marido, Marcelo Maranata — eleito e reeleito
            prefeito de Guaíba, com aprovação de mais de 82% da cidade e
            pré-candidato ao Governo do Estado —, construímos um modelo de
            gestão que é referência. O Marcelo provou que é possível ampliar
            hospitais, abrir leitos e expandir as ESFs com eficiência.
          </p>
          <p>
            Nossa parceria vai além da vida pessoal, é uma união de
            propósitos. Enquanto ele foca na macrogestão e no desenvolvimento
            econômico, eu garanto que o olhar humano e o cuidado com as
            pessoas sejam a prioridade absoluta. Somos a prova de que a
            gestão técnica e o coração podem, sim, caminhar juntos.
          </p>
        </RevealItem>

        <RevealItem delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-2xl border border-tinta/10 bg-bordo/[0.045] px-6 py-4">
            <span className="font-display block text-3xl font-extrabold text-bordo">+82%</span>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-tinta/60">
              Aprovação em Guaíba
            </span>
          </div>
          <div className="rounded-2xl border border-tinta/10 bg-bordo/[0.045] px-6 py-4">
            <span className="font-display block text-3xl font-extrabold text-bordo">2x</span>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-tinta/60">
              Eleito prefeito de Guaíba
            </span>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
