import { RevealSection, RevealItem } from "./RevealSection";

const VALORES = [
  { cor: "bg-bordo", nome: "Bordô", conceito: "Credibilidade e liderança" },
  { cor: "bg-amarelo", nome: "Amarelo", conceito: "Prosperidade e transformação" },
  { cor: "bg-luz-amarela", nome: "Luz Amarela", conceito: "Otimismo e esperança" },
  { cor: "bg-branco border border-tinta/10", nome: "Branco", conceito: "Clareza e elegância" },
];

export function ValoresMarca() {
  return (
    <RevealSection id="marca" className="relative bg-tinta py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amarelo">
            O que guia a Deisi
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
            Uma marca, quatro valores
          </h2>
        </RevealItem>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map((v, i) => (
            <RevealItem key={v.nome} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-branco/10 bg-branco/[0.03] p-6 transition-colors hover:border-amarelo/40">
                <span className={`block h-12 w-12 rounded-full ${v.cor} shadow-lg`} />
                <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-branco">
                  {v.nome}
                </h3>
                <p className="mt-1 text-sm text-branco/60">{v.conceito}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
