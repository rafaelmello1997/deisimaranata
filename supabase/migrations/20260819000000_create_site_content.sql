-- tabela de conteudo editavel do site (textos e imagens), pra alimentar o painel /admin
create table if not exists public.site_content (
  key text primary key,
  tipo text not null check (tipo in ('texto', 'imagem')),
  secao text not null,
  label text not null,
  valor text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "permite select publico"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "permite insert para logados"
  on public.site_content for insert
  to authenticated
  with check (true);

create policy "permite update para logados"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

-- bucket de imagens do site, upload feito pelo painel /admin
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "site-images leitura publica"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-images');

create policy "site-images upload para logados"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

create policy "site-images update para logados"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images');
