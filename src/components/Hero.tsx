import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import foto from "../assets/images/foto-oficial-deisi.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex h-svh w-full flex-col overflow-hidden bg-bordo"
    >
      {/* fundo chapado na cor principal, com leve sombreado nas bordas pra dar profundidade */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_140%_100%_at_50%_0%,var(--color-bordo)_0%,var(--color-bordo)_60%,var(--color-bordo-escuro)_100%)]"
      />

      {/* manchas decorativas flutuantes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-amarelo/25 blur-[90px] animate-float"
          style={{ animationDelay: "0s" }}
        />
        <motion.div
          className="absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-luz-amarela/20 blur-[110px] animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-branco/10 blur-[80px] animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* grade sutil */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-none flex-col items-center px-6 pt-14 text-center sm:pt-16">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-amarelo/40 bg-branco/5 px-4 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-amarelo backdrop-blur-sm sm:text-[10px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amarelo" />
            Pré-candidata a Deputada Estadual
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-[clamp(2.25rem,7.5vw,4.25rem)] font-extrabold uppercase leading-[0.86] tracking-tight text-branco"
          >
            Deisi
            <br />
            <span className="text-amarelo">Maranata</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projetos"
              className="rounded-full bg-amarelo px-6 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-tinta shadow-[0_8px_30px_rgba(255,204,0,0.35)] transition-transform hover:scale-105 sm:px-7 sm:py-3 sm:text-sm"
            >
              Conheça a Deisi
            </a>
            <span className="rounded-full border border-branco/25 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-branco/90 sm:px-7 sm:py-3 sm:text-sm">
              Nº 20.700
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* foto bem grande centralizada, com leve parallax, dominando o espaco restante da tela */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-4xl flex-1 items-end justify-center overflow-hidden px-4 pb-10 sm:pb-12"
      >
        <div className="absolute bottom-10 h-[75%] w-[90%] rounded-full bg-amarelo/20 blur-[70px] sm:bottom-12" />
        <img
          src={foto}
          alt="Deisi Maranata"
          className="relative h-full w-auto max-w-full select-none object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-1.5 text-branco/60"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.3em]">Role a página</span>
        <span className="animate-bounce-slow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
