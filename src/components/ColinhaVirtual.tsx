import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";
import { useContent } from "../lib/SiteContentContext";
import logo from "../assets/images/logo-deisi-vertical.png";
import fotoOficial from "../assets/images/foto-oficial-deisi.png";

// Dados reais dos candidatos 2026 (RS + Presidente), extraidos do portal de
// dados abertos do TSE (consulta_cand_2026 + fotos oficiais por candidato).
// Carregado sob demanda de /assets/colinha/candidatos.json pra nao inflar o
// bundle principal com ~1000 registros.
interface Candidato {
  cargo: string;
  numero: string;
  nome: string;
  nomeCompleto: string;
  partido: string;
  genero: string;
  sq: string;
}

type Mapa = Map<string, Map<string, Candidato>>;

interface Campo {
  id: string;
  cargo: string;
  label: string;
  tamanho: number;
}

const CAMPOS: Campo[] = [
  { id: "dep_federal", cargo: "dep_federal", label: "Deputado Federal", tamanho: 4 },
  { id: "senador1", cargo: "senador", label: "Senador · 1ª vaga", tamanho: 3 },
  { id: "senador2", cargo: "senador", label: "Senador · 2ª vaga", tamanho: 3 },
  { id: "governador", cargo: "governador", label: "Governador", tamanho: 2 },
  { id: "presidente", cargo: "presidente", label: "Presidente", tamanho: 2 },
];

const DEISI_SQ = "210002534305";

function CaixasNumero({
  tamanho,
  valor,
  onChange,
  disabled,
}: {
  tamanho: number;
  valor: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function setDigito(i: number, raw: string) {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = [...valor];
    next[i] = d;
    onChange(next);
    if (d && i < tamanho - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !valor[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  return (
    <div className="flex gap-1.5">
      {Array.from({ length: tamanho }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={valor[i] ?? ""}
          onChange={(e) => setDigito(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          aria-label={`dígito ${i + 1}`}
          className="h-14 w-11 rounded-lg border-2 border-bordo/25 text-center text-xl font-extrabold text-tinta outline-none focus:border-bordo disabled:bg-tinta/5 sm:h-16 sm:w-14 sm:text-2xl"
        />
      ))}
    </div>
  );
}

function CampoBusca({ campo, mapa }: { campo: Campo; mapa: Mapa | null }) {
  const [digitos, setDigitos] = useState<string[]>(() => Array(campo.tamanho).fill(""));
  const numero = digitos.join("");
  const completo = digitos.every((d) => d !== "");
  const candidato = completo ? mapa?.get(campo.cargo)?.get(numero) : undefined;
  const naoEncontrado = completo && !!mapa && !candidato;

  return (
    <div className="rounded-2xl border border-tinta/10 bg-branco/70 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-tinta/70">{campo.label}</p>
        {(numero.length > 0 || candidato) && (
          <button
            type="button"
            onClick={() => setDigitos(Array(campo.tamanho).fill(""))}
            className="text-[11px] font-semibold uppercase text-bordo/60 hover:text-bordo"
          >
            Limpar
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <CaixasNumero tamanho={campo.tamanho} valor={digitos} onChange={setDigitos} />
        {candidato && (
          <div className="flex items-center gap-3">
            <img
              src={`/assets/colinha/fotos/${candidato.sq}.jpg`}
              alt={candidato.nome}
              className="h-16 w-16 rounded-full border-2 border-bordo/20 object-cover sm:h-20 sm:w-20"
            />
            <div className="leading-tight">
              <p className="text-base font-bold text-tinta sm:text-lg">{candidato.nome}</p>
              <p className="text-xs uppercase tracking-wide text-tinta/45 sm:text-sm">{candidato.partido}</p>
            </div>
          </div>
        )}
        {naoEncontrado && (
          <span className="text-xs font-semibold text-bordo">Número não encontrado</span>
        )}
      </div>
    </div>
  );
}

export function ColinhaVirtual() {
  const eyebrow = useContent("colinha.eyebrow", "Não esqueça na hora de votar");
  const titulo = useContent("colinha.titulo", "Colinha Virtual");
  const texto = useContent(
    "colinha.texto",
    "Preencha com os seus candidatos, salve a imagem e leve no bolso pro dia da eleição.",
  );

  const [mapa, setMapa] = useState<Mapa | null>(null);
  const [salvando, setSalvando] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/assets/colinha/candidatos.json")
      .then((r) => r.json())
      .then((lista: Candidato[]) => {
        const m: Mapa = new Map();
        for (const c of lista) {
          if (!m.has(c.cargo)) m.set(c.cargo, new Map());
          m.get(c.cargo)!.set(c.numero, c);
        }
        setMapa(m);
      })
      .catch(() => {
        /* colinha funciona sem lookup se o fetch falhar -- campos ficam sem autocompletar */
      });
  }, []);

  const camposOrdenados = useMemo(() => CAMPOS, []);

  async function handleSalvar() {
    if (!cardRef.current || salvando) return;
    setSalvando(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#ffffff" });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "colinha-virtual-deisi-maranata.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setSalvando(false);
    }
  }

  return (
    <RevealSection id="colinha" className="relative overflow-hidden bg-branco py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="relative mx-auto max-w-6xl px-6">
        <RevealItem className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">{eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase text-tinta md:text-5xl">{titulo}</h2>
          <p className="mt-4 text-sm text-tinta/65 md:text-base">{texto}</p>
        </RevealItem>

        <RevealItem delay={0.1} className="mt-12">
          <div
            ref={cardRef}
            className="grid grid-cols-1 overflow-hidden rounded-[2rem] border border-bordo/10 bg-branco shadow-[0_20px_50px_rgba(32,4,16,0.15)] md:grid-cols-[1.3fr_1fr]"
          >
            <div className="p-7 sm:p-10">
              <div className="rounded-xl bg-bordo px-5 py-3.5 text-center">
                <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-branco">
                  Colinha Virtual
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-tinta/60">
                Anote seus candidatos e vote com segurança. Preencha sua colinha virtual e leve com
                você no dia da eleição. É rápido e te ajuda a não esquecer em quem votar.
              </p>

              <div className="mt-6 space-y-4">
                <CampoBusca campo={camposOrdenados[0]} mapa={mapa} />

                <div className="rounded-2xl border-2 border-bordo bg-bordo/10 p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-bordo">
                    Deputada Estadual · sua candidata
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex gap-1.5">
                      {"20700".split("").map((d, i) => (
                        <span
                          key={i}
                          className="flex h-14 w-11 items-center justify-center rounded-lg border-2 border-bordo bg-bordo text-xl font-extrabold text-branco sm:h-16 sm:w-14 sm:text-2xl"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={`/assets/colinha/fotos/${DEISI_SQ}.jpg`}
                        alt="Deisi Maranata"
                        className="h-16 w-16 rounded-full border-2 border-bordo object-cover sm:h-20 sm:w-20"
                      />
                      <div className="leading-tight">
                        <p className="text-base font-bold text-tinta sm:text-lg">DEISI MARANATA</p>
                        <p className="text-xs uppercase tracking-wide text-tinta/45 sm:text-sm">PODE</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CampoBusca campo={camposOrdenados[1]} mapa={mapa} />
                <CampoBusca campo={camposOrdenados[2]} mapa={mapa} />
                <CampoBusca campo={camposOrdenados[3]} mapa={mapa} />
                <CampoBusca campo={camposOrdenados[4]} mapa={mapa} />
              </div>
            </div>

            <div className="relative hidden bg-bordo md:block">
              <img
                src={fotoOficial}
                alt="Deisi Maranata"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bordo via-bordo/70 to-transparent p-6 pt-16">
                <img src={logo} alt="Deisi Maranata 20700" className="mx-auto w-40" />
              </div>
            </div>
          </div>
        </RevealItem>

        <RevealItem delay={0.15} className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleSalvar}
            disabled={salvando}
            className="rounded-full bg-amarelo px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-tinta transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando ? "Gerando…" : "Baixar colinha"}
          </button>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
