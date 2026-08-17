-- Rodar no SQL Editor do Supabase (projeto mobiliza.me / hmwplthwqbscprkjxrbe)
create table if not exists public.deisi_voluntarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  cidade text,
  origem text default 'site-deisimaranata',
  created_at timestamptz not null default now()
);

alter table public.deisi_voluntarios enable row level security;

-- formulario publico do site pode inserir, mas nao ler/editar/apagar
create policy "permite insert publico" on public.deisi_voluntarios
  for insert
  to anon
  with check (true);
