-- Painel administrativo (logado) pode ler os voluntarios cadastrados.
create policy "permite select para logados" on public.deisi_voluntarios
  for select
  to authenticated
  using (true);
