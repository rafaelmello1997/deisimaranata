import { type FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import logo from "../assets/images/logo-deisi-vertical.png";
import { ConteudoEditor } from "../components/admin/ConteudoEditor";

type Aba = "voluntarios" | "conteudo";

interface Voluntario {
  id: string;
  nome: string;
  whatsapp: string;
  cidade: string | null;
  origem: string | null;
  created_at: string;
}

export function AdminPanel() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [aba, setAba] = useState<Aba>("voluntarios");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session) return;
    setCarregando(true);
    supabase
      .from("deisi_voluntarios")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErro(error.message);
        else setVoluntarios((data as Voluntario[]) ?? []);
        setCarregando(false);
      });
  }, [session]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    const dados = new FormData(e.currentTarget);
    const email = String(dados.get("email") || "");
    const senha = String(dados.get("senha") || "");
    const { error } = await supabase!.auth.signInWithPassword({ email, password: senha });
    if (error) setErro("Email ou senha incorretos.");
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
    setVoluntarios([]);
  }

  function exportarCsv() {
    const linhas = [
      ["Nome", "WhatsApp", "Cidade", "Data"],
      ...voluntarios.map((v) => [v.nome, v.whatsapp, v.cidade ?? "", new Date(v.created_at).toLocaleString("pt-BR")]),
    ];
    const csv = linhas.map((l) => l.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voluntarios-deisi-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!supabase) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-tinta px-6 text-center text-branco">
        Configuração do Supabase ausente.
      </div>
    );
  }

  if (session === undefined) {
    return <div className="min-h-svh bg-tinta" />;
  }

  if (!session) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-tinta px-6">
        <div className="w-full max-w-sm rounded-2xl border border-branco/15 bg-bordo-escuro p-8">
          <img src={logo} alt="Deisi Maranata" className="mx-auto h-16 w-auto" />
          <h1 className="mt-4 text-center font-display text-lg font-bold uppercase text-branco">
            Painel da campanha
          </h1>
          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-xl border border-branco/20 bg-branco/95 px-4 py-3 text-sm text-tinta outline-none focus:border-amarelo"
            />
            <input
              required
              name="senha"
              type="password"
              placeholder="Senha"
              className="rounded-xl border border-branco/20 bg-branco/95 px-4 py-3 text-sm text-tinta outline-none focus:border-amarelo"
            />
            {erro && <p className="text-xs font-semibold text-luz-amarela">{erro}</p>}
            <button
              type="submit"
              className="mt-1 rounded-xl bg-amarelo px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-tinta transition-transform hover:scale-[1.02]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-tinta px-4 py-10 text-branco sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Deisi Maranata" className="h-10 w-auto" />
            <h1 className="font-display text-xl font-bold uppercase">Painel da campanha</h1>
          </div>
          <div className="flex gap-3">
            {aba === "voluntarios" && (
              <button
                onClick={exportarCsv}
                disabled={!voluntarios.length}
                className="rounded-full border border-branco/25 px-5 py-2 text-xs font-bold uppercase tracking-wide text-branco disabled:opacity-40"
              >
                Exportar CSV
              </button>
            )}
            <button
              onClick={handleLogout}
              className="rounded-full bg-amarelo px-5 py-2 text-xs font-bold uppercase tracking-wide text-tinta"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2 border-b border-branco/10">
          <button
            onClick={() => setAba("voluntarios")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${
              aba === "voluntarios"
                ? "border-b-2 border-amarelo text-branco"
                : "text-branco/50 hover:text-branco/80"
            }`}
          >
            Voluntários
          </button>
          <button
            onClick={() => setAba("conteudo")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${
              aba === "conteudo"
                ? "border-b-2 border-amarelo text-branco"
                : "text-branco/50 hover:text-branco/80"
            }`}
          >
            Editar site
          </button>
        </div>

        {aba === "voluntarios" ? (
          <>
            <p className="mt-6 text-sm text-branco/60">
              {carregando ? "Carregando…" : `${voluntarios.length} cadastro(s)`}
            </p>

            {erro && <p className="mt-4 text-sm text-luz-amarela">{erro}</p>}

            <div className="mt-6 overflow-x-auto rounded-2xl border border-branco/10">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-branco/5 text-[11px] uppercase tracking-wide text-branco/60">
                  <tr>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">WhatsApp</th>
                    <th className="px-4 py-3">Cidade</th>
                    <th className="px-4 py-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {voluntarios.map((v) => (
                    <tr key={v.id} className="border-t border-branco/10">
                      <td className="px-4 py-3 font-medium">{v.nome}</td>
                      <td className="px-4 py-3">{v.whatsapp}</td>
                      <td className="px-4 py-3">{v.cidade || "—"}</td>
                      <td className="px-4 py-3 text-branco/60">
                        {new Date(v.created_at).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                  {!carregando && voluntarios.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-branco/50">
                        Ninguém se cadastrou ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <ConteudoEditor />
        )}
      </div>
    </div>
  );
}
