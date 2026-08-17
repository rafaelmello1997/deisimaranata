import logo from "../assets/images/logo-deisi-vertical.png";
import { Sticker } from "./Sticker";
import stickerJuntos from "../assets/stickers/sticker-juntos-pelo-rs.png";

export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-bordo py-16">
      <Sticker
        src={stickerJuntos}
        width={120}
        rotate={-14}
        delay={0.2}
        className="absolute left-6 bottom-6 hidden opacity-80 md:block md:w-36"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <a href="#inicio" aria-label="Voltar ao topo" className="transition-transform hover:scale-105">
          <img src={logo} alt="Deisi Maranata" className="h-20 w-auto opacity-95 sm:h-24" />
        </a>

        <span className="rounded-full bg-amarelo px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-tinta">
          Candidata a Deputada Estadual
        </span>

        <a
          href="https://www.facebook.com/deisimaranata"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook da Deisi Maranata"
          className="inline-flex items-center gap-2 rounded-full border border-branco/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-branco/90 transition-colors hover:border-amarelo/60 hover:text-amarelo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
          </svg>
          Facebook
        </a>

        <div className="h-px w-24 bg-branco/15" />

        <div className="max-w-md space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-branco/40">
            Material de campanha · Deisi Maranata {new Date().getFullYear()}
          </p>
          <p className="text-[11px] uppercase tracking-[0.08em] text-branco/30">
            Eleição 2026 · Deisi Silveira Reinaldo · Deputado Estadual
          </p>
          <p className="text-[11px] tracking-[0.08em] text-branco/30">
            CNPJ 68.293.886/0001-42
          </p>
        </div>
      </div>
    </footer>
  );
}
