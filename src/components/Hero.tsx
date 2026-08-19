import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import foto from "../assets/images/foto-oficial-deisi.png";
import logo from "../assets/images/logo-deisi-vertical.png";
import stickerEuToCom from "../assets/stickers/sticker-eu-to-com-deisi.png";
import stickerJuntos from "../assets/stickers/sticker-juntos-pelo-rs.png";
import { Sticker } from "./Sticker";
import { useContent } from "../lib/SiteContentContext";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const badge = useContent("hero.badge", "Candidata a Deputada Estadual");
  const ctaApoiar = useContent("hero.cta_apoiar", "Quero apoiar");
  const ctaConhecer = useContent("hero.cta_conhecer", "Conheça a Deisi");
  const fotoUrl = useContent("hero.foto", foto);
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

      {/* nome repetido em contorno, estatico, preenchendo toda a section, num rosa bem escuro */}
      <div className="pointer-events-none absolute inset-0 z-[1] flex select-none flex-col justify-center gap-1 overflow-hidden opacity-70 sm:gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex w-max shrink-0 whitespace-nowrap"
            style={{ marginLeft: i % 2 === 0 ? "-6vw" : "-1vw" }}
          >
            {Array.from({ length: 6 }).map((_, k) => (
              <span
                key={k}
                className="font-display px-6 text-[16vw] font-extrabold uppercase leading-[0.9] tracking-tight lg:text-[9vw]"
                style={{ WebkitTextStroke: "1.5px var(--color-bordo-escuro)", color: "transparent" }}
              >
                Deisi Maranata
              </span>
            ))}
          </div>
        ))}
      </div>

      <Sticker
        src={stickerJuntos}
        width={78}
        rotate={10}
        delay={1}
        className="absolute right-4 top-20 z-10 hidden opacity-80 sm:right-8 sm:top-24 sm:block sm:w-24"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch">
        {/* foto na lateral, preenchendo toda a altura da section */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 flex min-h-0 flex-1 items-end justify-center overflow-hidden px-4 pb-8 sm:pb-10 lg:order-1 lg:items-stretch lg:pb-0 lg:pl-6"
        >
          <div className="absolute bottom-8 h-[70%] w-[90%] rounded-full bg-amarelo/15 blur-[70px] lg:bottom-0 lg:left-1/2 lg:h-[80%] lg:w-[60%] lg:-translate-x-1/2" />
          <img
            src={fotoUrl}
            alt="Deisi Maranata"
            className="relative h-full w-auto max-w-full select-none object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] lg:object-bottom"
            draggable={false}
          />
          {/* sticker na frente da Deisi, centralizado na parte inferior da foto */}
          <Sticker
            src={stickerEuToCom}
            width={420}
            rotate={-4}
            delay={0.5}
            className="absolute bottom-4 left-1/2 z-10 max-w-[calc(100%-2rem)] -translate-x-1/2 opacity-95 sm:bottom-9 sm:w-[620px] lg:bottom-12 lg:w-[760px]"
          />
        </motion.div>

        {/* texto do outro lado */}
        <div className="relative order-1 mx-auto flex w-full max-w-xl flex-none flex-col items-center px-6 pt-14 text-center sm:pt-16 lg:order-2 lg:my-auto lg:max-w-2xl lg:flex-1 lg:items-start lg:px-4 lg:pr-12 lg:pt-0 lg:text-left">
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="flex flex-col items-center lg:items-start"
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-amarelo/40 bg-branco/5 px-4 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-amarelo backdrop-blur-sm sm:text-[10px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amarelo" />
              {badge}
            </motion.span>

            <motion.img
              src={logo}
              alt="Deisi Maranata"
              draggable={false}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 h-auto w-full max-w-[260px] select-none sm:max-w-sm lg:max-w-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="#apoiar"
                className="rounded-full bg-amarelo px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-tinta shadow-[0_8px_30px_rgba(255,204,0,0.35)] transition-transform hover:scale-105 sm:px-10 sm:py-5 sm:text-base"
              >
                {ctaApoiar}
              </a>
              <a
                href="#quem-e"
                className="rounded-full border border-branco/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-branco/90 transition-colors hover:border-amarelo/50 sm:px-10 sm:py-5 sm:text-base"
              >
                {ctaConhecer}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
