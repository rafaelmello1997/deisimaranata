import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export interface SiteContentRow {
  key: string;
  tipo: "texto" | "imagem";
  secao: string;
  label: string;
  valor: string;
}

interface SiteContentValue {
  rows: SiteContentRow[];
  map: Record<string, string>;
  loading: boolean;
  reload: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentValue>({
  rows: [],
  map: {},
  loading: false,
  reload: async () => {},
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<SiteContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("site_content")
      .select("key,tipo,secao,label,valor");
    if (!error && data) setRows(data as SiteContentRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const map = useMemo(() => Object.fromEntries(rows.map((r) => [r.key, r.valor])), [rows]);

  return (
    <SiteContentContext.Provider value={{ rows, map, loading, reload: load }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function pickContent(map: Record<string, string>, key: string, fallback: string): string {
  const valor = map[key];
  return valor && valor.length > 0 ? valor : fallback;
}

export function useContent(key: string, fallback: string): string {
  const { map } = useContext(SiteContentContext);
  return pickContent(map, key, fallback);
}

export function useContentMap() {
  const { map } = useContext(SiteContentContext);
  return map;
}

export function useSiteContentAdmin() {
  return useContext(SiteContentContext);
}
