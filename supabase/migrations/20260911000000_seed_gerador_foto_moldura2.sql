insert into public.site_content (key, tipo, secao, label, valor) values
('gerador_foto.moldura2_titulo', 'texto', 'Gerador de foto de perfil', 'Moldura "Essa eu recomendo" - titulo', 'Essa eu recomendo e peço o teu voto!'),
('gerador_foto.moldura2_texto', 'texto', 'Gerador de foto de perfil', 'Moldura "Essa eu recomendo" - texto do eleitor', 'A Deisi Maranata conhece a nossa realidade, já fez projetos que mudaram realidades e já mostrou que sabe cuidar das pessoas. Por isso o meu voto é nela.')
on conflict (key) do nothing;
