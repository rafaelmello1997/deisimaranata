import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";

// Moldura oficial "Estou com Deisi Maranata" (reaproveitada do gerador
// standalone da campanha). Geometria do recorte circular fixa na arte:
// area transparente centralizada em (540.5, 540) com 868px de diametro,
// numa tela 1081x1081. Nao deve ser trocada pelo painel de conteudo --
// qualquer outra arte quebraria esse encaixe.
const MOLDURA_SRC = "/assets/moldura/moldura-estou-com-deisi.png";
const W = 1081;
const H = 1081;
const PHOTO_CX = 540.5;
const PHOTO_CY = 540;
const PHOTO_D = 868;

export function GeradorFoto() {
  const eyebrow = useContent("gerador_foto.eyebrow", "Mobilize sua rede");
  const titulo = useContent("gerador_foto.titulo", "Crie sua foto de perfil");
  const texto = useContent(
    "gerador_foto.texto",
    "Escolha sua foto, ajuste dentro da moldura e baixe pronta pra usar no Facebook e no Instagram.",
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  const photoImgRef = useRef<HTMLImageElement | null>(null);
  const estadoRef = useRef({ zoom: 1, offsetX: 0, offsetY: 0, dragging: false, lastX: 0, lastY: 0 });

  const [temFoto, setTemFoto] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [mostrarDica, setMostrarDica] = useState(false);

  function fitScale(photo: HTMLImageElement) {
    return Math.max(PHOTO_D / photo.naturalWidth, PHOTO_D / photo.naturalHeight);
  }

  function clampOffsets(photo: HTMLImageElement) {
    const s = fitScale(photo) * estadoRef.current.zoom;
    const dw = photo.naturalWidth * s;
    const dh = photo.naturalHeight * s;
    const maxX = Math.max(0, (dw - PHOTO_D) / 2);
    const maxY = Math.max(0, (dh - PHOTO_D) / 2);
    estadoRef.current.offsetX = Math.max(-maxX, Math.min(maxX, estadoRef.current.offsetX));
    estadoRef.current.offsetY = Math.max(-maxY, Math.min(maxY, estadoRef.current.offsetY));
  }

  function render() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);

    const photo = photoImgRef.current;
    if (photo) {
      clampOffsets(photo);
      const s = fitScale(photo) * estadoRef.current.zoom;
      const dw = photo.naturalWidth * s;
      const dh = photo.naturalHeight * s;
      const x = PHOTO_CX - dw / 2 + estadoRef.current.offsetX;
      const y = PHOTO_CY - dh / 2 + estadoRef.current.offsetY;
      ctx.drawImage(photo, x, y, dw, dh);
    }

    const frame = frameImgRef.current;
    if (frame?.complete) ctx.drawImage(frame, 0, 0, W, H);
  }

  useEffect(() => {
    const frame = new Image();
    frame.onload = render;
    frame.src = MOLDURA_SRC;
    frameImgRef.current = frame;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPos(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
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

  function handleBaixar() {
    const canvas = canvasRef.current;
    if (!canvas || !photoImgRef.current) return;
    render();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "foto-perfil-deisi-maranata-20700.png";
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
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-bordo/10 bg-branco shadow-[0_20px_50px_rgba(32,4,16,0.15)] md:max-w-none">
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              aria-label="Prévia da foto de perfil com moldura da campanha"
              className="aspect-square w-full touch-none select-none [cursor:grab] active:[cursor:grabbing]"
            />
            <span
              className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tinta/80 px-3 py-2 text-xs text-branco transition-opacity duration-200 ${
                mostrarDica ? "opacity-100" : "opacity-0"
              }`}
            >
              Arraste a foto para posicionar
            </span>
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
                  Gerada no tamanho original da arte: 1081 × 1081 px.
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
