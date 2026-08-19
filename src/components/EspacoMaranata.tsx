import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";

export function EspacoMaranata() {
  const eyebrow = useContent("espaco.eyebrow", "Espaço Maranata");
  const titulo = useContent("espaco.titulo", "Parceria que transforma");
  const p1 = useContent(
    "espaco.paragrafo_1",
    "Ao lado do meu marido, Marcelo Maranata — eleito e reeleito prefeito de Guaíba, com aprovação de mais de 82% da cidade e pré-candidato ao Governo do Estado —, construímos um modelo de gestão que é referência. O Marcelo provou que é possível ampliar hospitais, abrir leitos e expandir as ESFs com eficiência.",
  );
  const p2 = useContent(
    "espaco.paragrafo_2",
    "Nossa parceria vai além da vida pessoal, é uma união de propósitos. Enquanto ele foca na macrogestão e no desenvolvimento econômico, eu garanto que o olhar humano e o cuidado com as pessoas sejam a prioridade absoluta. Somos a prova de que a gestão técnica e o coração podem, sim, caminhar juntos.",
  );
  const stat1Valor = useContent("espaco.stat1_valor", "+82%");
  const stat1Label = useContent("espaco.stat1_label", "Aprovação em Guaíba");
  const stat2Valor = useContent("espaco.stat2_valor", "2x");
  const stat2Label = useContent("espaco.stat2_label", "Eleito prefeito de Guaíba");
  const stat3Valor = useContent("espaco.stat3_valor", "Pré-candidato");
  const stat3Label = useContent("espaco.stat3_label", "Ao Governo do Estado");
  const foto1 = useContent("espaco.foto_1", "/assets/maranata/maranata-1.jpg");
  const foto2 = useContent("espaco.foto_2", "/assets/maranata/maranata-2.jpg");

  return (
    <RevealSection className="relative overflow-hidden bg-bordo py-24 md:py-32">
      <ZigzagPattern tone="light" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-bordo-escuro/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <RevealItem>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
              {titulo}
            </h2>
          </RevealItem>

          <RevealItem delay={0.1} className="mt-8 space-y-4 text-[15px] leading-relaxed text-branco/85 md:text-base">
            <p>{p1}</p>
            <p>{p2}</p>
          </RevealItem>

          <RevealItem delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div className="rounded-2xl border border-branco/15 bg-branco/[0.06] px-6 py-4">
              <span className="font-display block text-3xl font-extrabold text-luz-amarela">{stat1Valor}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-branco/60">
                {stat1Label}
              </span>
            </div>
            <div className="rounded-2xl border border-branco/15 bg-branco/[0.06] px-6 py-4">
              <span className="font-display block text-3xl font-extrabold text-luz-amarela">{stat2Valor}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-branco/60">
                {stat2Label}
              </span>
            </div>
            <div className="rounded-2xl border border-branco/15 bg-branco/[0.06] px-6 py-4">
              <span className="font-display block text-lg font-extrabold uppercase leading-tight text-luz-amarela">
                {stat3Valor}
              </span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-branco/60">
                {stat3Label}
              </span>
            </div>
          </RevealItem>
        </div>

        <RevealItem delay={0.15} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 overflow-hidden rounded-2xl border border-branco/15 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <img
              src={foto1}
              alt="Deisi e Marcelo Maranata em evento público"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="col-span-2 overflow-hidden rounded-2xl border border-branco/15 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <img
              src={foto2}
              alt="Deisi e Marcelo Maranata juntos"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
