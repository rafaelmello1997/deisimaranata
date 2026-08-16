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
        <img src={logo} alt="Deisi Maranata" className="h-20 w-auto opacity-95 sm:h-24" />

        <span className="rounded-full bg-amarelo px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-tinta">
          Candidata a Deputada Estadual
        </span>

        <div className="h-px w-24 bg-branco/15" />

        <p className="max-w-md text-xs uppercase tracking-[0.14em] text-branco/40">
          Material de campanha · Deisi Maranata {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
