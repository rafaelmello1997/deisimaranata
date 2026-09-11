import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";

// Molduras da campanha. Cada uma tem geometria de recorte fixa na propria
// arte (circulo ou retangulo) -- nao deve ser trocada pelo painel de
// conteudo, so os textos (titulo/subtitulo) sao editaveis.
type Hole = { type: "circle"; cx: number; cy: number; d: number } | { type: "rect"; x: number; y: number; w: number; h: number };

interface Moldura {
  id: string;
  nome: string;
  thumb: string;
  src: string;
  w: number;
  h: number;
  hole: Hole;
  downloadName: string;
  temTexto?: boolean;
}

const MOLDURAS: Moldura[] = [
  {
    id: "classica",
    nome: "Estou com Deisi",
    thumb: "/assets/moldura/moldura-estou-com-deisi.png",
    src: "/assets/moldura/moldura-estou-com-deisi.png",
    w: 1081,
    h: 1081,
    hole: { type: "circle", cx: 540.5, cy: 540, d: 868 },
    downloadName: "foto-perfil-deisi-maranata-20700.png",
  },
  {
    id: "recomendo",
    nome: "Essa eu recomendo",
    thumb: "/assets/moldura/moldura-recomendo-thumb.png",
    src: "/assets/moldura/moldura-recomendo.png",
    w: 1080,
    h: 2150,
    hole: { type: "rect", x: 0, y: 0, w: 1080, h: 1162 },
    downloadName: "recomendo-deisi-maranata-20700.png",
    temTexto: true,
  },
];

function holeBox(hole: Hole) {
  if (hole.type === "circle") return { cx: hole.cx, cy: hole.cy, w: hole.d, h: hole.d };
  return { cx: hole.x + hole.w / 2, cy: hole.y + hole.h / 2, w: hole.w, h: hole.h };
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function GeradorFoto() {
  const eyebrow = useContent("gerador_foto.eyebrow", "Mobilize sua rede");
  const titulo = useContent("gerador_foto.titulo", "Crie sua foto de perfil");
  const texto = useContent(
    "gerador_foto.texto",
    "Escolha sua foto, ajuste dentro da moldura e baixe pronta pra usar no Facebook e no Instagram.",
  );
  const recomendoTitulo = useContent("gerador_foto.moldura2_titulo", "Essa eu recomendo e peço o teu voto!");
  const recomendoTexto = useContent(
    "gerador_foto.moldura2_texto",
    "A Deisi Maranata conhece a nossa realidade, já fez projetos que mudaram realidades e já mostrou que sabe cuidar das pessoas. Por isso o meu voto é nela.",
  );

  const [molduraId, setMolduraId] = useState(MOLDURAS[0].id);
  const moldura = MOLDURAS.find((m) => m.id === molduraId) ?? MOLDURAS[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  const photoImgRef = useRef<HTMLImageElement | null>(null);
  const molduraRef = useRef(moldura);
  const textoRef = useRef({ titulo: recomendoTitulo, texto: recomendoTexto });
  const estadoRef = useRef({ zoom: 1, offsetX: 0, offsetY: 0, dragging: false, lastX: 0, lastY: 0 });

  const [temFoto, setTemFoto] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [mostrarDica, setMostrarDica] = useState(false);

  molduraRef.current = moldura;
  textoRef.current = { titulo: recomendoTitulo, texto: recomendoTexto };

  function fitScale(photo: HTMLImageElement, box: { w: number; h: number }) {
    return Math.max(box.w / photo.naturalWidth, box.h / photo.naturalHeight);
  }

  function clampOffsets(photo: HTMLImageElement, box: { w: number; h: number }) {
    const s = fitScale(photo, box) * estadoRef.current.zoom;
    const dw = photo.naturalWidth * s;
    const dh = photo.naturalHeight * s;
    const maxX = Math.max(0, (dw - box.w) / 2);
    const maxY = Math.max(0, (dh - box.h) / 2);
    estadoRef.current.offsetX = Math.max(-maxX, Math.min(maxX, estadoRef.current.offsetX));
    estadoRef.current.offsetY = Math.max(-maxY, Math.min(maxY, estadoRef.current.offsetY));
  }

  function render() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const m = molduraRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, m.w, m.h);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, m.w, m.h);

    const photo = photoImgRef.current;
    const box = holeBox(m.hole);
    if (photo) {
      clampOffsets(photo, box);
      const s = fitScale(photo, box) * estadoRef.current.zoom;
      const dw = photo.naturalWidth * s;
      const dh = photo.naturalHeight * s;
      const x = box.cx - dw / 2 + estadoRef.current.offsetX;
      const y = box.cy - dh / 2 + estadoRef.current.offsetY;
      ctx.drawImage(photo, x, y, dw, dh);
    }

    const frame = frameImgRef.current;
    if (frame?.complete && frame.src.endsWith(m.src)) ctx.drawImage(frame, 0, 0, m.w, m.h);

    if (m.temTexto) {
      const { titulo: t, texto: p } = textoRef.current;
      const logoBottom = 1501;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      ctx.font = "800 56px 'TT Chocolates'";
      ctx.fillStyle = "#FFFFFF";
      let ty = logoBottom + 100;
      for (const line of wrapText(ctx, t, 900)) {
        ctx.fillText(line, m.w / 2, ty);
        ty += 66;
      }

      ty += 20;
      ctx.font = "400 34px 'TT Chocolates'";
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      for (const line of wrapText(ctx, p, 860)) {
        ctx.fillText(line, m.w / 2, ty);
        ty += 46;
      }
    }
  }

  useEffect(() => {
    const frame = new Image();
    frame.onload = render;
    frame.src = moldura.src;
    frameImgRef.current = frame;
    estadoRef.current.zoom = 1;
    estadoRef.current.offsetX = 0;
    estadoRef.current.offsetY = 0;
    setZoom(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [molduraId]);

  useEffect(() => {
    document.fonts?.ready?.then(() => render());
  }, []);

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recomendoTitulo, recomendoTexto]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPos(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      const m = molduraRef.current;
      return { x: (e.clientX - r.left) * (m.w / r.width), y: (e.clientY - r.top) * (m.h / r.height) };
    }
    function onDown(e: PointerEvent) {
      if (!photoImgRef.current) return;
      estadoRef.current.dragging = true;
      canvas!.setPointerCapture(e.pointerId);
      const p = pointerPos(e);
      estadoRef.current.lastX = p.x;
      estadoRef.current.lastY = p.y;
    }
    function onMove(e: PointerEvent) {
      if (!estadoRef.current.dragging || !photoImgRef.current) return;
      const p = pointerPos(e);
      estadoRef.current.offsetX += p.x - estadoRef.current.lastX;
      estadoRef.current.offsetY += p.y - estadoRef.current.lastY;
      estadoRef.current.lastX = p.x;
      estadoRef.current.lastY = p.y;
      render();
    }
    function onUp(e: PointerEvent) {
      estadoRef.current.dragging = false;
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        // pointer ja liberado
      }
    }
    function onWheel(e: WheelEvent) {
      if (!photoImgRef.current) return;
      e.preventDefault();
      const next = Math.max(1, Math.min(3, estadoRef.current.zoom + (e.deltaY < 0 ? 0.06 : -0.06)));
      estadoRef.current.zoom = next;
      setZoom(next);
      render();
    }

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  function handleEscolherFoto(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !f.type.startsWith("image/")) return;

    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      photoImgRef.current = img;
      estadoRef.current.zoom = 1;
      estadoRef.current.offsetX = 0;
      estadoRef.current.offsetY = 0;
      setZoom(1);
      setTemFoto(true);
      render();
      setMostrarDica(true);
      setTimeout(() => setMostrarDica(false), 2300);
    };
    img.src = url;
  }

  function handleZoom(v: number) {
    estadoRef.current.zoom = v;
    setZoom(v);
    render();
  }

  function handleCentralizar() {
    estadoRef.current.zoom = 1;
    estadoRef.current.offsetX = 0;
    estadoRef.current.offsetY = 0;
    setZoom(1);
    render();
  }

  function handleTrocarMoldura(id: string) {
    if (id === molduraId) return;
    setMolduraId(id);
  }

  function handleBaixar() {
    const canvas = canvasRef.current;
    if (!canvas || !photoImgRef.current) return;
    render();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = moldura.downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1200);
    }, "image/png");
  }

  return (
    <RevealSection id="gerador-foto" className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">{eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">{titulo}</h2>
          <p className="mt-4 text-sm text-tinta/65 md:text-base">{texto}</p>
        </RevealItem>

        <RevealItem delay={0.1} className="mt-14 grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_340px]">
          <div className="mx-auto w-full max-w-md md:max-w-none">
            <div
              className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-bordo/10 bg-branco shadow-[0_20px_50px_rgba(32,4,16,0.15)]"
              style={{ aspectRatio: `${moldura.w} / ${moldura.h}`, maxWidth: moldura.hole.type === "rect" ? 360 : undefined }}
            >
              <canvas
                ref={canvasRef}
                width={moldura.w}
                height={moldura.h}
                aria-label="Prévia da foto de perfil com moldura da campanha"
                className="h-full w-full touch-none select-none [cursor:grab] active:[cursor:grabbing]"
              />
              <span
                className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tinta/80 px-3 py-2 text-xs text-branco transition-opacity duration-200 ${
                  mostrarDica ? "opacity-100" : "opacity-0"
                }`}
              >
                Arraste a foto para posicionar
              </span>
            </div>

            <div className="mx-auto mt-4 flex w-full max-w-md justify-center gap-3 md:max-w-none">
              {MOLDURAS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleTrocarMoldura(m.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-1.5 transition-colors ${
                    m.id === molduraId ? "border-bordo" : "border-transparent hover:border-bordo/30"
                  }`}
                >
                  <span className="block h-14 w-14 overflow-hidden rounded-lg bg-tinta/5">
                    <img src={m.thumb} alt={m.nome} className="h-full w-full object-cover object-top" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-tinta/70">{m.nome}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-tinta/10 bg-bordo/[0.045] p-6">
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bordo text-sm font-extrabold text-branco">
                1
              </span>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-tinta">Escolha sua foto</p>
                <p className="mt-1 text-xs leading-relaxed text-tinta/60">
                  Use uma foto nítida, de preferência com o rosto centralizado.
                </p>
              </div>
            </div>

            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleEscolherFoto} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-4 w-full rounded-xl bg-amarelo px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-tinta transition-transform hover:scale-[1.02]"
            >
              {temFoto ? "Trocar foto" : "Escolher foto"}
            </button>

            <div className="mt-5 rounded-xl bg-branco/60 p-4">
              <div className="flex items-center justify-between text-xs font-bold text-tinta">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                disabled={!temFoto}
                onChange={(e) => handleZoom(Number(e.target.value))}
                className="mt-2 w-full accent-bordo disabled:opacity-40"
              />
            </div>

            <button
              type="button"
              onClick={handleCentralizar}
              disabled={!temFoto}
              className="mt-3 w-full rounded-xl border border-tinta/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-tinta/80 transition-colors hover:border-bordo/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Centralizar foto
            </button>

            <div className="mt-6 flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bordo text-sm font-extrabold text-branco">
                2
              </span>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-tinta">Baixe a imagem pronta</p>
                <p className="mt-1 text-xs leading-relaxed text-tinta/60">
                  Gerada no tamanho original da arte: {moldura.w} × {moldura.h} px.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleBaixar}
              disabled={!temFoto}
              className="mt-4 w-full rounded-xl bg-bordo px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-branco transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Baixar foto pronta
            </button>

            <p className="mt-5 border-t border-tinta/10 pt-4 text-[11px] leading-relaxed text-tinta/50">
              Sua foto é processada só no seu navegador — este gerador não envia a imagem pra nenhum servidor.
            </p>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
