import { useEffect, useState } from "react";
import { motion } from "motion/react";
import logo from "../assets/images/logo-deisi-vertical.png";
import { useContent } from "../lib/SiteContentContext";

const NAV = [
  { href: "#quem-e", label: "Quem é" },
  { href: "#o-elo", label: "O Elo" },
  { href: "#bandeiras", label: "Bandeiras" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const ctaLabel = useContent("header.cta", "Quero apoiar");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-tinta/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logo} alt="Deisi Maranata" className="h-9 w-auto drop-shadow-md sm:h-11" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-branco/80 transition-colors hover:text-amarelo"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#apoiar"
          className="rounded-full bg-amarelo px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-tinta transition-transform hover:scale-105"
        >
          {ctaLabel}
        </a>
      </div>
    </motion.header>
  );
}
