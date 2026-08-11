import { type FormEvent, useState } from "react";
import { RevealItem, RevealSection } from "./RevealSection";
import { ZigzagPattern } from "./ZigzagPattern";

// TODO: ligar o submit num backend/webhook real (Formspree, edge function etc.)
// e trocar o href do "Zap da Deisi" pelo numero real (https://wa.me/55...).
export function CTAFinal() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <RevealSection id="apoiar" className="relative overflow-hidden bg-amarelo py-24 md:py-32">
      <ZigzagPattern tone="dark" />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-branco/40 blur-[100px]" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-bordo/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RevealItem>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bordo">
            Vamos juntos
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] text-tinta md:text-5xl">
            Cuidar das pessoas,
            <br /> transformar o Rio Grande
          </h2>
        </RevealItem>

        <RevealItem delay={0.15} className="mx-auto mt-10 max-w-lg">
          {enviado ? (
            <div className="rounded-2xl border border-tinta/15 bg-branco/50 p-8">
              <p className="font-display text-lg font-bold text-tinta">Obrigada por apoiar! 💛</p>
              <p className="mt-2 text-sm text-tinta/70">
                Em breve alguém da equipe da Deisi entra em contato com você.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-tinta/15 bg-branco/70 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-bordo sm:col-span-2"
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp"
                className="rounded-xl border border-tinta/15 bg-branco/70 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-bordo"
              />
              <input
                type="text"
                placeholder="Cidade"
                className="rounded-xl border border-tinta/15 bg-branco/70 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 outline-none focus:border-bordo"
              />
              <button
                type="submit"
                className="rounded-xl bg-bordo px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-branco transition-transform hover:scale-[1.02] sm:col-span-2"
              >
                Quero ser voluntária(o)
              </button>
            </form>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-tinta/20 bg-tinta px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-branco transition-transform hover:scale-105"
            >
              Zap da Deisi
            </a>
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
