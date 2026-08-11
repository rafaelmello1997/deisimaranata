import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJETO_FOTOS } from "../data/projetosFotos";

interface GaleriaLightboxProps {
  projetoKey: string | null;
  onClose: () => void;
}

export function GaleriaLightbox({ projetoKey, onClose }: GaleriaLightboxProps) {
  const projeto = projetoKey ? PROJETO_FOTOS[projetoKey] : null;

  useEffect(() => {
    if (!projeto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [projeto, onClose]);

  return (
    <AnimatePresence>
      {projeto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-tinta/97 px-4 py-16 backdrop-blur-md sm:px-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amarelo">
                  Provas de entrega
                </span>
                <h3 className="font-display mt-2 text-2xl font-extrabold uppercase text-branco sm:text-3xl">
                  {projeto.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar galeria"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-branco/20 text-branco transition-colors hover:border-amarelo hover:text-amarelo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {projeto.fotos.map((src) => (
                <div key={src} className="overflow-hidden rounded-xl border border-branco/10 bg-bordo-escuro">
                  <img src={src} alt={projeto.label} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
