import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";

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
    texto: "Menos Brasília e menos Porto Alegre, mais recursos direto onde a vida acontece: nas cidades do interior.",
  },
];

export function Bandeiras() {
  return (
    <RevealSection id="bandeiras" className="relative overflow-hidden bg-bordo-escuro py-24 md:py-32">
      <ZigzagPattern tone="light" />
      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amarelo">
            O que defendo
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
            Bandeiras de luta
          </h2>
          <p className="mt-4 text-sm text-branco/60 md:text-base">
            Compromissos claros pra Assembleia Legislativa, pautados pela
            emancipação do cidadão e pela eficiência do Estado.
          </p>
        </RevealItem>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {BANDEIRAS.map((b, i) => (
            <RevealItem
              key={b.n}
              delay={i * 0.08}
              className={i === 4 ? "md:col-span-2" : undefined}
            >
              <div className="group flex h-full gap-5 rounded-2xl border border-branco/10 bg-branco/[0.03] p-6 transition-colors hover:border-amarelo/40 md:p-7">
                <span className="font-display shrink-0 text-3xl font-extrabold text-amarelo/70 md:text-4xl">
                  {b.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-branco">
                    {b.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-branco/65">{b.texto}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
