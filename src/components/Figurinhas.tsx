import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";

interface Figurinha {
  nome: string;
  src: string;
  w: number;
  h: number;
}

const FIGURINHAS: Figurinha[] = [
  { nome: "Eu tô com Deisi", src: "/assets/figurinhas/sticker-eu-to-com-deisi.png", w: 1100, h: 495 },
  { nome: "The Best", src: "/assets/figurinhas/sticker-the-best.png", w: 1100, h: 993 },
  { nome: "Vou de 20700", src: "/assets/figurinhas/sticker-vou-de-20700.png", w: 1100, h: 893 },
  { nome: "Quem cuida, representa", src: "/assets/figurinhas/sticker-quem-cuida-representa.png", w: 631, h: 1100 },
  { nome: "Juntos pelo RS", src: "/assets/figurinhas/sticker-juntos-pelo-rs.png", w: 1100, h: 1100 },
  { nome: "Mapa do RS", src: "/assets/figurinhas/sticker-mapa-rs.png", w: 1100, h: 982 },
  { nome: "Eldorado do Sul vai de Deisi", src: "/assets/figurinhas/sticker-eldorado-do-sul.png", w: 1100, h: 992 },
  { nome: "Camaquã vai de Deisi", src: "/assets/figurinhas/sticker-camaqua.png", w: 973, h: 1100 },
  { nome: "Região Costa Doce vai de Deisi", src: "/assets/figurinhas/sticker-regiao-costa-doce.png", w: 1100, h: 1090 },
  { nome: "Quem tem fé vai de Deisi", src: "/assets/figurinhas/sticker-quem-tem-fe.png", w: 1100, h: 975 },
  { nome: "Guaíba vai de Deisi", src: "/assets/figurinhas/sticker-guaiba.png", w: 960, h: 1100 },
  { nome: "Deisi Maranata 20700", src: "/assets/figurinhas/sticker-deisi-avatar.png", w: 631, h: 1100 },
];

function slugify(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Figurinhas() {
  const eyebrow = useContent("figurinhas.eyebrow", "Leve a campanha com você");
  const titulo = useContent("figurinhas.titulo", "Central de Figurinhas");
  const texto = useContent(
    "figurinhas.texto",
    "Baixe as figurinhas oficiais e espalhe pelo WhatsApp, status e redes sociais.",
  );

  return (
    <RevealSection id="figurinhas" className="relative overflow-hidden bg-bordo py-24 md:py-32">
      <ZigzagPattern tone="light" />
      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-luz-amarela">{eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-branco md:text-5xl">{titulo}</h2>
          <p className="mt-4 text-sm text-branco/65 md:text-base">{texto}</p>
        </RevealItem>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {FIGURINHAS.map((f, i) => (
            <RevealItem key={f.src} delay={(i % 4) * 0.06} className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-branco/10 bg-branco shadow-[0_14px_34px_rgba(32,4,16,0.22)]">
                <div className="flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#fff_0%,#fdf0f5_100%)] p-5">
                  <img
                    src={f.src}
                    alt={f.nome}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="font-display text-xs font-bold uppercase leading-tight text-tinta sm:text-sm">
                    {f.nome}
                  </p>
                  <span className="w-fit rounded-full bg-bordo/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-bordo">
                    PNG · {f.w}×{f.h}px
                  </span>
                  <a
                    href={f.src}
                    download={`figurinha-deisi-${slugify(f.nome)}.png`}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-bordo px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-branco transition-transform hover:scale-[1.03]"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M12 3v13M12 16l-5-5M12 16l5-5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Baixar
                  </a>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
