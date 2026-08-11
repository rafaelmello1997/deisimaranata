import { RevealSection, RevealItem } from "./RevealSection";

// Projetos reais do gabinete (pasta "Projetos gabinete" no Drive).
// TODO: trocar o placeholder de cor por foto real de cada pasta assim que o download for aprovado.
const PROJETOS = [
  { nome: "15 anos dos sonhos" },
  { nome: "Casa do artesão" },
  { nome: "Casa solidária e Lavanderia" },
  { nome: "Doação gera impacto" },
  { nome: "Gurias incríveis" },
  { nome: "Projeto Guarda-chuva" },
  { nome: "Rede empreendedora" },
  { nome: "Sala bem-me-quer" },
  { nome: "Varal solidário" },
];

const GRADIENTES = [
  "from-bordo to-bordo-escuro",
  "from-amarelo to-bordo",
  "from-luz-amarela to-amarelo",
  "from-bordo-escuro to-tinta",
];

export function Projetos() {
  return (
    <RevealSection id="projetos" className="relative bg-tinta py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <RevealItem>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amarelo">
              Realizações
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
              Projetos que já
              <br className="hidden md:block" /> transformam vidas
            </h2>
          </RevealItem>
          <RevealItem delay={0.1}>
            <p className="max-w-sm text-sm text-branco/60">
              Iniciativas do gabinete que saem do papel e chegam na vida das
              famílias, das gurias e dos empreendedores da comunidade.
            </p>
          </RevealItem>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((p, i) => (
            <RevealItem key={p.nome} delay={(i % 3) * 0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-branco/10">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    GRADIENTES[i % GRADIENTES.length]
                  } opacity-90 transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/10 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-display text-xl font-bold text-branco drop-shadow-md">
                    {p.nome}
                  </h3>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
