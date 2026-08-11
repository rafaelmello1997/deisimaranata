import { useEffect, useRef, useState } from "react";
import { GaleriaLightbox } from "./GaleriaLightbox";

/* Carrossel 3D "Slipstream" (getlayers.ai), portado pra React -- mesma base
   ja usada no site do Marcos Filipe, restilizada pra paleta da Deisi.
   Fisica de drag/inercia/drift roda via refs, fora do ciclo do React.
   Clicar num card (sem arrastar) abre a galeria completa daquele projeto. */

type Card = { img: string; title: string; meta: string; projeto: string };

const CARDS: Card[] = [
  { img: "/assets/projetos/casa-solidaria-lavanderia-2.jpg", title: "Casa Solidária em ação", meta: "Casa Solidária", projeto: "casa-solidaria" },
  { img: "/assets/projetos/rede-empreendedora-1.jpg", title: "Formando novas empreendedoras", meta: "Rede Empreendedora", projeto: "rede-empreendedora" },
  { img: "/assets/projetos/projeto-guarda-chuva-1.jpg", title: "Educando contra a violência", meta: "Projeto Guarda-Chuva", projeto: "guarda-chuva" },
  { img: "/assets/projetos/gurias-incriveis-2.jpg", title: "Autoestima e futuro para as gurias", meta: "Gurias Incríveis", projeto: "gurias-incriveis" },
  { img: "/assets/projetos/casa-do-artesao-1.jpg", title: "Renda para as artesãs de Guaíba", meta: "Casa do Artesão", projeto: "casa-artesao" },
  { img: "/assets/projetos/varal-solidario-1.jpg", title: "Dignidade escolhida a dedo", meta: "Varal Solidário", projeto: "varal-solidario" },
  { img: "/assets/projetos/doacao-gera-impacto-2.jpg", title: "Roupas viram travesseiros novos", meta: "Doação Gera Impacto", projeto: "doacao-gera-impacto" },
  { img: "/assets/projetos/casa-solidaria-lavanderia-3.jpg", title: "Perto de quem precisa", meta: "Casa Solidária", projeto: "casa-solidaria" },
  { img: "/assets/projetos/rede-empreendedora-3.jpg", title: "Rede Empreendedora · Cadastro", meta: "Autonomia financeira", projeto: "rede-empreendedora" },
  { img: "/assets/projetos/sala-bem-me-quer-1.jpg", title: "Acolhimento para quem enfrenta o câncer", meta: "Sala Bem-Me-Quer", projeto: "sala-bem-me-quer" },
  { img: "/assets/projetos/gurias-incriveis-1.jpg", title: "Contraturno que muda trajetórias", meta: "Gurias Incríveis", projeto: "gurias-incriveis" },
  { img: "/assets/projetos/casa-do-artesao-2.jpg", title: "A comunidade toda reunida", meta: "Casa do Artesão", projeto: "casa-artesao" },
  { img: "/assets/projetos/projeto-guarda-chuva-2.jpg", title: "Sinais de abuso, ensinados cedo", meta: "Projeto Guarda-Chuva", projeto: "guarda-chuva" },
  { img: "/assets/projetos/doacao-gera-impacto-3.jpg", title: "Cada peça vira dignidade", meta: "Doação Gera Impacto", projeto: "doacao-gera-impacto" },
];

const P = {
  slots: 14,
  cardRatio: 1.34,
  tilt: -32,
  spacing: 0.3,
  perspective: 1,
  cardY: 0.6,
  corner: 14,
  autoScroll: 0.22,
  drag: 0.9,
  damp: 0.92,
  hoverLift: 1.035,
  fadeFar: 0.24,
  nearHide: 0.4,
  scrim: 1.2,
};

const TAP_MAX_MOVE = 6;

export function OElo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const [activeProjeto, setActiveProjeto] = useState<string | null>(null);
  const openRef = useRef<(key: string) => void>(() => {});
  openRef.current = (key: string) => setActiveProjeto(key);

  useEffect(() => {
    const stage = stageRef.current;
    const belt = beltRef.current;
    if (!stage || !belt) return;

    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CAN_HOVER = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let cardEls: HTMLElement[] = [];
    let hoverEl: HTMLElement | null = null;
    let CW = 230,
      CH = 308,
      STEP = 220,
      SPAN = 1980;
    let pos = 0,
      vel = 0,
      dragging = false,
      lastX = 0,
      downX = 0,
      downY = 0,
      moved = 0,
      downTarget: HTMLElement | null = null;
    let lastPlaced = Number.NaN;
    let rafId = 0;

    function buildBelt() {
      if (!belt) return;
      belt.innerHTML = "";
      cardEls = [];
      hoverEl = null;
      for (let i = 0; i < P.slots; i++) {
        const cd = CARDS[i % CARDS.length];
        if (!cd) continue;
        const card = document.createElement("article");
        card.className = "elo-card";
        card.dataset.projeto = cd.projeto;
        card.innerHTML = `
          <div class="elo-card__inner">
            <img src="${cd.img}" alt="${cd.title}" draggable="false" loading="lazy" />
            <div class="elo-card__scrim"></div>
            <div class="elo-card__foot">
              <p class="elo-card__meta">${cd.meta}</p>
              <h3 class="elo-card__title">${cd.title}</h3>
            </div>
            <div class="elo-card__hint">Ver fotos</div>
          </div>`;
        belt.appendChild(card);
        cardEls.push(card);
      }
    }

    function layout() {
      if (!stage) return;
      const vw = stage.clientWidth || window.innerWidth;
      CW = Math.min(250, Math.max(168, vw * 0.16));
      CH = CW * P.cardRatio;
      STEP = CW * (1 + P.spacing);
      SPAN = STEP * P.slots;
      stage.style.setProperty("--cw", CW + "px");
      stage.style.setProperty("--ch", CH + "px");
      stage.style.setProperty("--cy", P.cardY * 100 + "%");
      stage.style.setProperty("--tilt", P.tilt + "deg");
      stage.style.perspective = Math.max(800, vw * 0.9 * P.perspective) + "px";
      stage.style.perspectiveOrigin = "50% " + P.cardY * 100 + "%";
    }

    const smoothstep = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    function vis(f: number) {
      const far = smoothstep(-0.5, -0.5 + P.fadeFar, f);
      const near = 1 - smoothstep(P.nearHide, 0.5, f);
      return Math.min(far, near);
    }

    function place() {
      const half = SPAN / 2;
      for (let i = 0; i < cardEls.length; i++) {
        let x = (((i * STEP + pos) % SPAN) + SPAN) % SPAN;
        if (x > half) x -= SPAN;
        const op = vis(x / SPAN);
        const el = cardEls[i];
        if (!el) continue;
        el.style.transform = "translateX(" + x.toFixed(1) + "px)";
        el.style.opacity = op.toFixed(3);
        el.style.visibility = op < 0.008 ? "hidden" : "visible";
      }
    }

    function setHover(card: HTMLElement | null) {
      if (card === hoverEl) return;
      if (hoverEl) hoverEl.classList.remove("-active");
      hoverEl = card;
      if (hoverEl) hoverEl.classList.add("-active");
    }
    function hoverAt(x: number, y: number) {
      const el = document.elementFromPoint(x, y);
      setHover(el ? (el.closest(".elo-card") as HTMLElement | null) : null);
    }

    const onResize = () => {
      layout();
      place();
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      downX = e.clientX;
      downY = e.clientY;
      moved = 0;
      vel = 0;
      downTarget = (e.target as HTMLElement)?.closest(".elo-card") as HTMLElement | null;
      setHover(null);
      stage.classList.add("-drag");
      stage.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const d = dx * P.drag;
        pos += d;
        vel = d;
        moved += Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
      } else if (CAN_HOVER) {
        hoverAt(e.clientX, e.clientY);
      }
    };
    const onPointerEnd = (e: PointerEvent) => {
      const totalMove = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
      if (dragging && totalMove < TAP_MAX_MOVE && downTarget) {
        const key = downTarget.dataset.projeto;
        if (key) openRef.current(key);
      }
      dragging = false;
      downTarget = null;
      stage.classList.remove("-drag");
    };
    const onWindowPointerEnd = () => {
      if (dragging) {
        dragging = false;
        downTarget = null;
        stage.classList.remove("-drag");
      }
    };
    const onPointerLeave = () => setHover(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        vel += STEP * 0.14;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        vel -= STEP * 0.14;
        e.preventDefault();
      } else if (e.key === "Enter" || e.key === " ") {
        if (hoverEl?.dataset.projeto) openRef.current(hoverEl.dataset.projeto);
        e.preventDefault();
      }
    };

    function tick() {
      if (!dragging) {
        if (!hoverEl) {
          pos += vel;
          if (!REDUCE) pos -= P.autoScroll;
        }
        vel *= P.damp;
      }
      if (pos !== lastPlaced) {
        place();
        lastPlaced = pos;
      }
      rafId = requestAnimationFrame(tick);
    }

    buildBelt();
    layout();
    place();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", onResize);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerEnd);
    stage.addEventListener("pointercancel", onPointerEnd);
    stage.addEventListener("lostpointercapture", onPointerEnd);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerup", onWindowPointerEnd);
    window.addEventListener("pointercancel", onWindowPointerEnd);
    window.addEventListener("blur", onWindowPointerEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerEnd);
      stage.removeEventListener("pointercancel", onPointerEnd);
      stage.removeEventListener("lostpointercapture", onPointerEnd);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerup", onWindowPointerEnd);
      window.removeEventListener("pointercancel", onWindowPointerEnd);
      window.removeEventListener("blur", onWindowPointerEnd);
    };
  }, []);

  return (
    <>
      <section
        id="o-elo"
        className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-tinta"
        style={
          {
            "--corner": `${P.corner}px`,
            "--lift": P.hoverLift,
            "--scrim": P.scrim,
          } as React.CSSProperties
        }
      >
        <style>{`
          .elo-stage { position:absolute; inset:0; overflow:hidden;
            background: radial-gradient(130% 100% at 72% 62%, #3a0620 0%, #200410 62%, #14020a 100%);
            cursor: grab; touch-action: pan-y; user-select:none; outline:none; }
          .elo-stage.-drag { cursor: grabbing; }
          .elo-belt { position:absolute; inset:0; transform-style:preserve-3d;
            transform: rotateY(var(--tilt, -32deg)); }
          .elo-card { position:absolute; left:50%; top:var(--cy,64%); cursor: pointer;
            width:var(--cw,230px); height:var(--ch,308px);
            margin-left:calc(var(--cw,230px) / -2); margin-top:calc(var(--ch,308px) / -2);
            transform-style:preserve-3d; will-change:transform,opacity; }
          .elo-card__inner { position:absolute; inset:0; border-radius:var(--corner,14px); overflow:hidden;
            background:#2a0616;
            box-shadow: 0 40px 80px -24px rgba(0,0,0,.72), 0 8px 24px -10px rgba(0,0,0,.6);
            transition: transform .34s cubic-bezier(.22,.61,.36,1), box-shadow .34s ease; }
          .elo-card.-active .elo-card__inner { transform: scale(var(--lift,1.035));
            box-shadow: 0 52px 100px -24px rgba(0,0,0,.8), 0 10px 30px -10px rgba(0,0,0,.7); }
          .elo-card__inner img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
          .elo-card__scrim { position:absolute; inset:0; pointer-events:none; opacity:var(--scrim,1);
            background: linear-gradient(to top, rgba(20,2,10,.94) 0%, rgba(20,2,10,.55) 24%, rgba(20,2,10,.08) 46%, rgba(20,2,10,0) 62%); }
          .elo-card__foot { position:absolute; left:16px; right:14px; bottom:15px; z-index:2; }
          .elo-card__meta { margin:0 0 4px; font-family:'TT Chocolates', sans-serif; font-size:10px; font-weight:600; letter-spacing:.16em;
            text-transform:uppercase; color:var(--color-amarelo, #FFCC00); }
          .elo-card__title { margin:0; font-family:'TT Chocolates', sans-serif; font-weight:600;
            font-size:16px; line-height:1.15; letter-spacing:-.005em; color:#fff;
            text-shadow:0 2px 14px rgba(0,0,0,.55); }
          .elo-card__hint { position:absolute; top:12px; right:12px; z-index:2;
            font-family:'TT Chocolates', sans-serif; font-size:9px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
            color:#fff; background:rgba(20,2,10,.55); border:1px solid rgba(255,255,255,.25); border-radius:999px; padding:4px 9px;
            opacity:0; transition:opacity .25s ease; }
          .elo-card.-active .elo-card__hint { opacity:1; }
          .elo-vignette { position:absolute; inset:0; z-index:2; pointer-events:none;
            background: linear-gradient(to right, #14020a 0%, rgba(20,2,10,.55) 12%, rgba(20,2,10,0) 34%),
                        linear-gradient(to bottom, rgba(20,2,10,0) 62%, rgba(20,2,10,.5) 100%); }
          @media (prefers-reduced-motion: reduce) { .elo-card__inner { transition:none; } }
        `}</style>

        <div ref={stageRef} className="elo-stage" tabIndex={0} role="region" aria-label="O Elo — arraste para explorar, clique num card pra ver todas as fotos do projeto">
          <div ref={beltRef} className="elo-belt" />
        </div>
        <div className="elo-vignette" />

        <div className="pointer-events-none absolute inset-x-0 top-[9%] z-[4] px-6 text-center sm:top-[11%]">
          <span className="mono text-[11px] font-semibold uppercase tracking-[0.3em] text-amarelo">
            O Elo
          </span>
          <h2 className="font-display mx-auto mt-3 max-w-4xl text-4xl leading-[0.95] tracking-tight text-white uppercase sm:text-6xl md:text-7xl">
            De quem dá voz,
            <br className="hidden sm:block" /> para quem decide
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 text-[11px] font-medium tracking-[0.3em] text-white/35 uppercase">
          Arraste para explorar · clique pra ver as fotos
        </div>
      </section>

      <GaleriaLightbox projetoKey={activeProjeto} onClose={() => setActiveProjeto(null)} />
    </>
  );
}
