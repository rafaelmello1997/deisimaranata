insert into public.site_content (key, tipo, secao, label, valor) values
('colinha.eyebrow', 'texto', 'Colinha virtual', 'Texto pequeno acima do titulo', 'Não esqueça na hora de votar'),
('colinha.titulo', 'texto', 'Colinha virtual', 'Titulo da secao', 'Colinha Virtual'),
('colinha.texto', 'texto', 'Colinha virtual', 'Texto de apoio', 'Preencha com os seus candidatos, salve a imagem e leve no bolso pro dia da eleição.')
on conflict (key) do nothing;
