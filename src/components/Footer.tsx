import logo from "../assets/images/logo-deisi-vertical.png";

export function Footer() {
  return (
    <footer id="contato" className="relative bg-tinta py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        <img src={logo} alt="Deisi Maranata" className="h-16 w-auto opacity-90" />

        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-2xl font-extrabold uppercase tracking-wide text-branco">
            Deisi Maranata
          </span>
          <span className="rounded-full bg-amarelo px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-tinta">
            Nº 20.700 · Deputada Estadual
          </span>
        </div>

        <div className="h-px w-24 bg-branco/15" />

        <p className="max-w-md text-xs uppercase tracking-[0.14em] text-branco/40">
          Material de campanha · Deisi Maranata {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
