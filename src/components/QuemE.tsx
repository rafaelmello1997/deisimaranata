import { RevealItem, RevealSection } from "./RevealSection";
import { Sticker } from "./Sticker";
import stickerEuToCom from "../assets/stickers/sticker-eu-to-com-deisi.png";
import { useContent } from "../lib/SiteContentContext";

export function QuemE() {
  const eyebrow = useContent("quem_e.eyebrow", "Quem é");
  const titulo = useContent("quem_e.titulo", "Deisi Maranata");
  const p1 = useContent(
    "quem_e.paragrafo_1",
    "Antes de qualquer título, sou esposa do Marcelo Maranata, mãe, advogada e cristã. Minha fé é o que me sustenta e minha família é o meu maior patrimônio. Nasci em Camaquã, onde aprendi o valor do trabalho e da palavra empenhada, mas foi em Guaíba que construí minha história e meu propósito.",
  );
  const p2 = useContent(
    "quem_e.paragrafo_2",
    "Enquanto Primeira-Dama de Guaíba, voluntária, não me limitei ao protocolo. Liderei projetos que tocaram o coração e a realidade de milhares de famílias, provando que a política, quando feita com amor e gestão, transforma vidas. Hoje, como presidente do Podemos Mulher RS, percorro o Rio Grande ouvindo cada região, fortalecendo a voz feminina e preparando um novo caminho para o nosso estado.",
  );
  const p3 = useContent(
    "quem_e.paragrafo_3",
    "Em 2022, milhares de gaúchos depositaram sua confiança em mim, tornando-me a mulher mais votada do meu partido. Agora, volto com mais experiência, com resultados comprovados e com a coragem necessária para ocupar a cadeira que está vazia em termos de representação.",
  );
  const p4 = useContent(
    "quem_e.paragrafo_4",
    "Minha maior escola foi a maternidade. Enfrentar o desafio de um filho com doença autoimune me ensinou que a dor de uma mãe não pode esperar a burocracia do Estado. Na crise histórica de 2024, enquanto Eldorado do Sul estava 90% submersa e Guaíba sofria, eu estava lá — não de longe, mas com o pé no barro, organizando donativos e acolhendo desabrigados.",
  );
  const fotoUrl = useContent("quem_e.foto", "/assets/projetos/casa-solidaria-lavanderia-3.jpg");

  return (
    <RevealSection id="quem-e" className="relative overflow-hidden bg-bordo py-24 md:py-32">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Sticker
        src={stickerEuToCom}
        width={190}
        rotate={-6}
        delay={0.5}
        className="absolute bottom-8 right-6 hidden opacity-90 lg:block lg:w-64"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <RevealItem className="relative mx-auto w-full max-w-sm md:sticky md:top-28">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-branco/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-branco/15">
            <img
              src={fotoUrl}
              alt="Deisi Maranata acolhendo uma beneficiária da Casa Solidária"
              className="h-full w-full object-cover"
            />
          </div>
        </RevealItem>

        <div>
          <RevealItem>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">
              {titulo}
            </h2>
          </RevealItem>

          <RevealItem delay={0.1} className="mt-6 space-y-4 text-[15px] leading-relaxed text-branco/85 md:text-base">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
            <p>{p4}</p>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
