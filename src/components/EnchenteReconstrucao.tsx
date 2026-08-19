import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";

export function EnchenteReconstrucao() {
  const eyebrow = useContent("enchente.eyebrow", "A força da nossa gente na linha de frente");
  const titulo = useContent("enchente.titulo", "A Enchente e a Reconstrução");
  const p1 = useContent(
    "enchente.paragrafo_1",
    "As marcas da enchente ainda estão no nosso chão e na nossa memória. Quando a água subiu e a angústia tomou conta das nossas cidades, vimos o que o nosso estado tem de mais forte: a solidariedade de quem não foge à luta. Naqueles dias mais escuros, não havia espaço ou tempo para discursos vazios. A única resposta possível era colocar o pé no barro, organizar o acolhimento e garantir que as famílias não estivessem sozinhas.",
  );
  const p2 = useContent(
    "enchente.paragrafo_2",
    "O socorro aconteceu na prática, lado a lado, sem esperar por cargos ou calendários. Hoje, o desafio da reconstrução continua e exige pulso firme. O nosso estado precisa de quem conhece a dor de quem perdeu tudo e tem a coragem necessária para lutar, todos os dias, por leis e recursos que protejam e reergam a nossa região. O cuidado que esteve nas ruas é a força que vai defender o nosso futuro.",
  );
  const foto1 = useContent("enchente.foto_1", "/assets/enchente/enchente-3.jpg");
  const foto2 = useContent("enchente.foto_2", "/assets/enchente/enchente-1.jpg");
  const foto3 = useContent("enchente.foto_3", "/assets/enchente/enchente-2.jpg");

  return (
    <RevealSection id="enchente" className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />

      {/* linha d'agua decorativa */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-bordo/10"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 30 Q 100 5, 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30 V0 H0 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <RevealItem>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] text-tinta md:text-5xl">
              {titulo}
            </h2>
          </RevealItem>

          <RevealItem delay={0.1} className="mt-8 space-y-5 text-left text-[15px] leading-relaxed text-tinta/80 md:text-base">
            <p className="border-l-2 border-bordo/40 pl-5">{p1}</p>
            <p className="border-l-2 border-bordo/40 pl-5">{p2}</p>
          </RevealItem>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { src: foto1, alt: "Deisi Maranata organizando doações de roupas pra vítimas da enchente" },
            { src: foto2, alt: "Abraço emocionado durante o trabalho da Defesa Civil na enchente" },
            { src: foto3, alt: "Voluntária da Defesa Civil organizando donativos pra famílias desabrigadas" },
          ].map((foto, i) => (
            <RevealItem key={`${foto.src}-${i}`} delay={0.15 + i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-bordo/10 shadow-[0_16px_40px_rgba(32,4,16,0.12)]">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
