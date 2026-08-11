interface ZigzagPatternProps {
  tone?: "light" | "dark";
  className?: string;
}

// Textura decorativa de fundo -- listras em zigzag, bem sutil, nao muda a cor da section.
export function ZigzagPattern({ tone = "light", className = "" }: ZigzagPatternProps) {
  const id = tone === "light" ? "zigzag-light" : "zigzag-dark";
  const stroke = tone === "light" ? "rgba(255,255,255,0.5)" : "rgba(32,4,16,0.35)";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: tone === "light" ? 0.06 : 0.05 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M0 22 L11 4 L22 22 L33 4 L44 22"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M0 44 L11 26 L22 44 L33 26 L44 44"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
