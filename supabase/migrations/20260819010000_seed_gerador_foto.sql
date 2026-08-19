insert into public.site_content (key, tipo, secao, label, valor) values
('gerador_foto.eyebrow', 'texto', 'Gerador de foto de perfil', 'Texto pequeno acima do titulo', 'Mobilize sua rede'),
('gerador_foto.titulo', 'texto', 'Gerador de foto de perfil', 'Titulo da secao', 'Crie sua foto de perfil'),
('gerador_foto.texto', 'texto', 'Gerador de foto de perfil', 'Texto de apoio', 'Escolha sua foto, ajuste dentro da moldura e baixe pronta pra usar no Facebook e no Instagram.')
on conflict (key) do nothing;
