insert into public.site_content (key, tipo, secao, label, valor) values
('figurinhas.eyebrow', 'texto', 'Central de figurinhas', 'Texto pequeno acima do titulo', 'Leve a campanha com você'),
('figurinhas.titulo', 'texto', 'Central de figurinhas', 'Titulo da secao', 'Central de Figurinhas'),
('figurinhas.texto', 'texto', 'Central de figurinhas', 'Texto de apoio', 'Baixe as figurinhas oficiais e espalhe pelo WhatsApp, status e redes sociais.')
on conflict (key) do nothing;
