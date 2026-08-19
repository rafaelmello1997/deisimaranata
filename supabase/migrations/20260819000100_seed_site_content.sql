-- popula site_content com o conteudo real atual do site, pra tabela nao comecar vazia
-- on conflict do nothing: seguro rodar de novo sem sobrescrever edicoes feitas pelo painel

insert into public.site_content (key, tipo, secao, label, valor) values

-- header
('header.cta', 'texto', 'Cabecalho', 'Texto do botao de apoio', 'Quero apoiar'),

-- hero
('hero.badge', 'texto', 'Hero (topo)', 'Badge acima da logo', 'Candidata a Deputada Estadual'),
('hero.cta_apoiar', 'texto', 'Hero (topo)', 'Botao amarelo', 'Quero apoiar'),
('hero.cta_conhecer', 'texto', 'Hero (topo)', 'Botao contorno', 'Conheça a Deisi'),
('hero.foto', 'imagem', 'Hero (topo)', 'Foto principal da Deisi', '/assets/images/foto-oficial-deisi.png'),

-- quem e
('quem_e.eyebrow', 'texto', 'Quem é', 'Texto pequeno acima do titulo', 'Quem é'),
('quem_e.titulo', 'texto', 'Quem é', 'Titulo da secao', 'Deisi Maranata'),
('quem_e.paragrafo_1', 'texto', 'Quem é', 'Paragrafo 1 da bio', 'Antes de qualquer título, sou esposa do Marcelo Maranata, mãe, advogada e cristã. Minha fé é o que me sustenta e minha família é o meu maior patrimônio. Nasci em Camaquã, onde aprendi o valor do trabalho e da palavra empenhada, mas foi em Guaíba que construí minha história e meu propósito.'),
('quem_e.paragrafo_2', 'texto', 'Quem é', 'Paragrafo 2 da bio', 'Enquanto Primeira-Dama de Guaíba, voluntária, não me limitei ao protocolo. Liderei projetos que tocaram o coração e a realidade de milhares de famílias, provando que a política, quando feita com amor e gestão, transforma vidas. Hoje, como presidente do Podemos Mulher RS, percorro o Rio Grande ouvindo cada região, fortalecendo a voz feminina e preparando um novo caminho para o nosso estado.'),
('quem_e.paragrafo_3', 'texto', 'Quem é', 'Paragrafo 3 da bio', 'Em 2022, milhares de gaúchos depositaram sua confiança em mim, tornando-me a mulher mais votada do meu partido. Agora, volto com mais experiência, com resultados comprovados e com a coragem necessária para ocupar a cadeira que está vazia em termos de representação.'),
('quem_e.paragrafo_4', 'texto', 'Quem é', 'Paragrafo 4 da bio', 'Minha maior escola foi a maternidade. Enfrentar o desafio de um filho com doença autoimune me ensinou que a dor de uma mãe não pode esperar a burocracia do Estado. Na crise histórica de 2024, enquanto Eldorado do Sul estava 90% submersa e Guaíba sofria, eu estava lá — não de longe, mas com o pé no barro, organizando donativos e acolhendo desabrigados.'),
('quem_e.foto', 'imagem', 'Quem é', 'Foto ao lado da bio', '/assets/projetos/casa-solidaria-lavanderia-3.jpg'),

-- enchente
('enchente.eyebrow', 'texto', 'Enchente e Reconstrução', 'Texto pequeno acima do titulo', 'A força da nossa gente na linha de frente'),
('enchente.titulo', 'texto', 'Enchente e Reconstrução', 'Titulo da secao', 'A Enchente e a Reconstrução'),
('enchente.paragrafo_1', 'texto', 'Enchente e Reconstrução', 'Paragrafo 1', 'As marcas da enchente ainda estão no nosso chão e na nossa memória. Quando a água subiu e a angústia tomou conta das nossas cidades, vimos o que o nosso estado tem de mais forte: a solidariedade de quem não foge à luta. Naqueles dias mais escuros, não havia espaço ou tempo para discursos vazios. A única resposta possível era colocar o pé no barro, organizar o acolhimento e garantir que as famílias não estivessem sozinhas.'),
('enchente.paragrafo_2', 'texto', 'Enchente e Reconstrução', 'Paragrafo 2', 'O socorro aconteceu na prática, lado a lado, sem esperar por cargos ou calendários. Hoje, o desafio da reconstrução continua e exige pulso firme. O nosso estado precisa de quem conhece a dor de quem perdeu tudo e tem a coragem necessária para lutar, todos os dias, por leis e recursos que protejam e reergam a nossa região. O cuidado que esteve nas ruas é a força que vai defender o nosso futuro.'),
('enchente.foto_1', 'imagem', 'Enchente e Reconstrução', 'Foto 1', '/assets/enchente/enchente-3.jpg'),
('enchente.foto_2', 'imagem', 'Enchente e Reconstrução', 'Foto 2', '/assets/enchente/enchente-1.jpg'),
('enchente.foto_3', 'imagem', 'Enchente e Reconstrução', 'Foto 3', '/assets/enchente/enchente-2.jpg'),

-- bandeiras
('bandeiras.eyebrow', 'texto', 'Bandeiras de luta', 'Texto pequeno acima do titulo', 'O que defendo'),
('bandeiras.titulo', 'texto', 'Bandeiras de luta', 'Titulo da secao', 'Bandeiras de luta'),
('bandeiras.subtitulo', 'texto', 'Bandeiras de luta', 'Texto abaixo do titulo', 'Compromissos claros pra Assembleia Legislativa, pautados pela emancipação do cidadão e pela eficiência do Estado.'),
('bandeiras.01.titulo', 'texto', 'Bandeiras de luta', 'Bandeira 01 - titulo', 'Saúde com Dignidade'),
('bandeiras.01.texto', 'texto', 'Bandeiras de luta', 'Bandeira 01 - texto', 'Menos filas, mais especialistas e humanização no atendimento. A saúde não pode ser um privilégio de quem mora na capital.'),
('bandeiras.02.titulo', 'texto', 'Bandeiras de luta', 'Bandeira 02 - titulo', 'Proteção Integral'),
('bandeiras.02.texto', 'texto', 'Bandeiras de luta', 'Bandeira 02 - texto', 'Leis rigorosas e redes de apoio para mães, mulheres, crianças, idosos e PCDs. Apoio total às mães atípicas, que cuidam de todos, mas também precisam de cuidado.'),
('bandeiras.03.titulo', 'texto', 'Bandeiras de luta', 'Bandeira 03 - titulo', 'Empreendedorismo e Renda'),
('bandeiras.03.texto', 'texto', 'Bandeiras de luta', 'Bandeira 03 - texto', 'Menos impostos para quem gera emprego e microcrédito facilitado para a mulher empreendedora.'),
('bandeiras.04.titulo', 'texto', 'Bandeiras de luta', 'Bandeira 04 - titulo', 'Educação de Oportunidade'),
('bandeiras.04.texto', 'texto', 'Bandeiras de luta', 'Bandeira 04 - texto', 'Ensino técnico conectado com a vocação de cada região, garantindo que o jovem gaúcho tenha futuro aqui.'),
('bandeiras.05.titulo', 'texto', 'Bandeiras de luta', 'Bandeira 05 - titulo', 'Fortalecimento dos Municípios'),
('bandeiras.05.texto', 'texto', 'Bandeiras de luta', 'Bandeira 05 - texto', 'Menos Brasília e mais recursos onde a vida acontece, nas cidades.'),

-- projetos
('projetos.eyebrow', 'texto', 'Projetos', 'Texto pequeno acima do titulo', 'Realizações'),
('projetos.titulo_linha1', 'texto', 'Projetos', 'Titulo - linha 1', 'Projetos que já'),
('projetos.titulo_linha2', 'texto', 'Projetos', 'Titulo - linha 2', 'transformam vidas'),
('projetos.descricao', 'texto', 'Projetos', 'Texto ao lado do titulo', 'Iniciativas do gabinete que saem do papel e chegam na vida das famílias, das gurias e dos empreendedores da comunidade. Clique num card pra ver todas as fotos.'),
('projetos.casa_solidaria.nome', 'texto', 'Projetos', 'Card - Casa solidária: nome', 'Casa solidária e Lavanderia'),
('projetos.casa_solidaria.foto', 'imagem', 'Projetos', 'Card - Casa solidária: foto', '/assets/projetos/casa-solidaria-lavanderia-1.jpg'),
('projetos.rede_empreendedora.nome', 'texto', 'Projetos', 'Card - Rede empreendedora: nome', 'Rede empreendedora'),
('projetos.rede_empreendedora.foto', 'imagem', 'Projetos', 'Card - Rede empreendedora: foto', '/assets/projetos/rede-empreendedora-1.jpg'),
('projetos.guarda_chuva.nome', 'texto', 'Projetos', 'Card - Guarda-chuva: nome', 'Projeto Guarda-chuva'),
('projetos.guarda_chuva.foto', 'imagem', 'Projetos', 'Card - Guarda-chuva: foto', '/assets/projetos/projeto-guarda-chuva-1.jpg'),
('projetos.gurias_incriveis.nome', 'texto', 'Projetos', 'Card - Gurias incríveis: nome', 'Gurias incríveis'),
('projetos.gurias_incriveis.foto', 'imagem', 'Projetos', 'Card - Gurias incríveis: foto', '/assets/projetos/gurias-incriveis-1.jpg'),
('projetos.casa_artesao.nome', 'texto', 'Projetos', 'Card - Casa do artesão: nome', 'Casa do artesão'),
('projetos.casa_artesao.foto', 'imagem', 'Projetos', 'Card - Casa do artesão: foto', '/assets/projetos/casa-do-artesao-1.jpg'),
('projetos.varal_solidario.nome', 'texto', 'Projetos', 'Card - Varal solidário: nome', 'Varal solidário'),
('projetos.varal_solidario.foto', 'imagem', 'Projetos', 'Card - Varal solidário: foto', '/assets/projetos/varal-solidario-1.jpg'),
('projetos.sala_bem_me_quer.nome', 'texto', 'Projetos', 'Card - Sala bem-me-quer: nome', 'Sala bem-me-quer'),
('projetos.sala_bem_me_quer.foto', 'imagem', 'Projetos', 'Card - Sala bem-me-quer: foto', '/assets/projetos/sala-bem-me-quer-1.jpg'),
('projetos.doacao_gera_impacto.nome', 'texto', 'Projetos', 'Card - Doação gera impacto: nome', 'Doação gera impacto'),
('projetos.doacao_gera_impacto.foto', 'imagem', 'Projetos', 'Card - Doação gera impacto: foto', '/assets/projetos/doacao-gera-impacto-1.jpg'),

-- depoimentos
('depoimentos.eyebrow', 'texto', 'Depoimentos', 'Texto pequeno acima do titulo', 'Quem viveu, conta'),
('depoimentos.titulo_linha1', 'texto', 'Depoimentos', 'Titulo - linha 1', 'Depoimentos de quem'),
('depoimentos.titulo_linha2', 'texto', 'Depoimentos', 'Titulo - linha 2', 'foi impactado'),
('depoimentos.video_1.legenda', 'texto', 'Depoimentos', 'Legenda do video 1', 'Casa solidária'),
('depoimentos.video_2.legenda', 'texto', 'Depoimentos', 'Legenda do video 2', 'Lavanderia solidária'),
('depoimentos.video_3.legenda', 'texto', 'Depoimentos', 'Legenda do video 3', 'Gurias incríveis'),

-- espaco maranata
('espaco.eyebrow', 'texto', 'Espaço Maranata', 'Texto pequeno acima do titulo', 'Espaço Maranata'),
('espaco.titulo', 'texto', 'Espaço Maranata', 'Titulo da secao', 'Parceria que transforma'),
('espaco.paragrafo_1', 'texto', 'Espaço Maranata', 'Paragrafo 1', 'Ao lado do meu marido, Marcelo Maranata — eleito e reeleito prefeito de Guaíba, com aprovação de mais de 82% da cidade e pré-candidato ao Governo do Estado —, construímos um modelo de gestão que é referência. O Marcelo provou que é possível ampliar hospitais, abrir leitos e expandir as ESFs com eficiência.'),
('espaco.paragrafo_2', 'texto', 'Espaço Maranata', 'Paragrafo 2', 'Nossa parceria vai além da vida pessoal, é uma união de propósitos. Enquanto ele foca na macrogestão e no desenvolvimento econômico, eu garanto que o olhar humano e o cuidado com as pessoas sejam a prioridade absoluta. Somos a prova de que a gestão técnica e o coração podem, sim, caminhar juntos.'),
('espaco.stat1_valor', 'texto', 'Espaço Maranata', 'Estatística 1 - número', '+82%'),
('espaco.stat1_label', 'texto', 'Espaço Maranata', 'Estatística 1 - legenda', 'Aprovação em Guaíba'),
('espaco.stat2_valor', 'texto', 'Espaço Maranata', 'Estatística 2 - número', '2x'),
('espaco.stat2_label', 'texto', 'Espaço Maranata', 'Estatística 2 - legenda', 'Eleito prefeito de Guaíba'),
('espaco.stat3_valor', 'texto', 'Espaço Maranata', 'Estatística 3 - número', 'Pré-candidato'),
('espaco.stat3_label', 'texto', 'Espaço Maranata', 'Estatística 3 - legenda', 'Ao Governo do Estado'),
('espaco.foto_1', 'imagem', 'Espaço Maranata', 'Foto 1', '/assets/maranata/maranata-1.jpg'),
('espaco.foto_2', 'imagem', 'Espaço Maranata', 'Foto 2', '/assets/maranata/maranata-2.jpg'),

-- galeria
('galeria.eyebrow', 'texto', 'Galeria', 'Texto pequeno acima do titulo', 'Bastidores'),
('galeria.titulo_linha1', 'texto', 'Galeria', 'Titulo - linha 1', 'De perto,'),
('galeria.titulo_linha2', 'texto', 'Galeria', 'Titulo - linha 2', 'de verdade'),
('galeria.texto', 'texto', 'Galeria', 'Texto de apoio', 'A galeria completa com os registros do dia a dia da Deisi com a comunidade está sendo preparada e chega em breve nesta página.'),
('galeria.badge', 'texto', 'Galeria', 'Badge', 'Galeria em construção'),
('galeria.foto', 'imagem', 'Galeria', 'Foto', '/assets/projetos/gurias-incriveis-2.jpg'),

-- cta final
('cta_final.eyebrow', 'texto', 'Chamada final (Apoiar)', 'Texto pequeno acima do titulo', 'Vamos juntos'),
('cta_final.titulo_linha1', 'texto', 'Chamada final (Apoiar)', 'Titulo - linha 1', 'Cuidar das pessoas,'),
('cta_final.titulo_linha2', 'texto', 'Chamada final (Apoiar)', 'Titulo - linha 2', 'transformar o Rio Grande'),
('cta_final.form_botao', 'texto', 'Chamada final (Apoiar)', 'Texto do botao do formulario', 'Quero ser voluntária(o)'),
('cta_final.whatsapp_botao', 'texto', 'Chamada final (Apoiar)', 'Texto do botao de WhatsApp direto', 'Zap da Deisi'),
('cta_final.whatsapp_numero', 'texto', 'Chamada final (Apoiar)', 'Número de WhatsApp (só dígitos, com DDI+DDD, ex: 5551999999999)', '5551993441838'),

-- footer
('footer.badge', 'texto', 'Rodapé', 'Badge abaixo da logo', 'Candidata a Deputada Estadual'),
('footer.facebook_url', 'texto', 'Rodapé', 'Link do Facebook', 'https://www.facebook.com/deisimaranata'),
('footer.nome_legal_linha', 'texto', 'Rodapé', 'Linha de identificação legal (nome/cargo)', 'Eleição 2026 · Deisi Silveira Reinaldo · Deputado Estadual'),
('footer.cnpj_linha', 'texto', 'Rodapé', 'Linha do CNPJ do comitê', 'CNPJ 68.293.886/0001-42')

on conflict (key) do nothing;
