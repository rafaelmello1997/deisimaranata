import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { pickContent, useContent, useContentMap } from "../lib/SiteContentContext";

const BANDEIRAS = [
  {
    n: "01",
    titulo: "Saúde com Dignidade",
    texto: "Menos filas, mais especialistas e humanização no atendimento. A saúde não pode ser um privilégio de quem mora na capital.",
  },
  {
    n: "02",
    titulo: "Proteção Integral",
    texto: "Leis rigorosas e redes de apoio para mães, mulheres, crianças, idosos e PCDs. Apoio total às mães atípicas, que cuidam de todos, mas também precisam de cuidado.",
  },
  {
    n: "03",
    titulo: "Empreendedorismo e Renda",
    texto: "Menos impostos para quem gera emprego e microcrédito facilitado para a mulher empreendedora.",
  },
  {
    n: "04",
    titulo: "Educação de Oportunidade",
    texto: "Ensino técnico conectado com a vocação de cada região, garantindo que o jovem gaúcho tenha futuro aqui.",
  },
  {
    n: "05",
    titulo: "Fortalecimento dos Municípios",
    texto: "Menos Brasília e mais recursos onde a vida acontece, nas cidades.",
  },
];

export function Bandeiras() {
  const map = useContentMap();
  const eyebrow = useContent("bandeiras.eyebrow", "O que defendo");
  const titulo = useContent("bandeiras.titulo", "Bandeiras de luta");
  const subtitulo = useContent(
    "bandeiras.subtitulo",
    "Compromissos claros pra Assembleia Legislativa, pautados pela emancipação do cidadão e pela eficiência do Estado.",
  );

  return (
    <RevealSection id="bandeiras" className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">
            {titulo}
          </h2>
          <p className="mt-4 text-sm text-tinta/65 md:text-base">{subtitulo}</p>
        </RevealItem>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {BANDEIRAS.map((bFallback, i) => {
            const b = {
              ...bFallback,
              titulo: pickContent(map, `bandeiras.${bFallback.n}.titulo`, bFallback.titulo),
              texto: pickContent(map, `bandeiras.${bFallback.n}.texto`, bFallback.texto),
            };
            return (
            <RevealItem
              key={b.n}
              delay={i * 0.08}
              className={i === 4 ? "md:col-span-2" : undefined}
            >
              <div className="group flex h-full gap-5 rounded-2xl border border-tinta/10 bg-bordo/[0.045] p-6 transition-colors hover:border-bordo/40 md:p-7">
                <span className="font-display shrink-0 text-3xl font-extrabold text-bordo/70 md:text-4xl">
                  {b.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-tinta">
                    {b.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/70">{b.texto}</p>
                </div>
              </div>
            </RevealItem>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
