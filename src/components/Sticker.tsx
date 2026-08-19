interface StickerProps {
  src: string;
  className?: string;
  rotate?: number;
  delay?: number;
  width?: number;
}

export function Sticker({ src, className = "", rotate = 0, delay = 0, width = 140 }: StickerProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none w-[var(--sticker-w)] select-none animate-float drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${className}`}
      style={
        {
          "--sticker-w": `${width}px`,
          transform: `rotate(${rotate}deg)`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
    />
  );
}
