import { RevealSection, RevealItem } from "./RevealSection";
import { useContent } from "../lib/SiteContentContext";

// Galeria completa (banco de fotos "Banco de fotos para CARDS" no Drive)
// entra aqui assim que o download das imagens for aprovado e feito.
export function Galeria() {
  const eyebrow = useContent("galeria.eyebrow", "Bastidores");
  const tituloLinha1 = useContent("galeria.titulo_linha1", "De perto,");
  const tituloLinha2 = useContent("galeria.titulo_linha2", "de verdade");
  const texto = useContent(
    "galeria.texto",
    "A galeria completa com os registros do dia a dia da Deisi com a comunidade está sendo preparada e chega em breve nesta página.",
  );
  const badge = useContent("galeria.badge", "Galeria em construção");
  const fotoUrl = useContent("galeria.foto", "/assets/projetos/gurias-incriveis-2.jpg");

  return (
    <RevealSection id="galeria" className="relative overflow-hidden bg-branco py-24 md:py-32">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(32,4,16,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(32,4,16,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <RevealItem>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">
            {tituloLinha1}
            <br /> {tituloLinha2}
          </h2>
          <p className="mt-5 max-w-md text-sm text-tinta/70 md:text-base">{texto}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-bordo/30 bg-bordo/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-bordo">
            {badge}
          </span>
        </RevealItem>

        <RevealItem delay={0.15} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-bordo/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-tinta/10 bg-tinta/40">
            <img
              src={fotoUrl}
              alt="Deisi Maranata com as Gurias Incríveis"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
