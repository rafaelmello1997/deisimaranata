// Banco de fotos reais por projeto (public/assets/projetos).
// Usado pelo carrossel "O Elo" e pelos cards de Projetos pra abrir a galeria completa do assunto.
export interface ProjetoFotos {
  key: string;
  label: string;
  fotos: string[];
}

export const PROJETO_FOTOS: Record<string, ProjetoFotos> = {
  "casa-solidaria": {
    key: "casa-solidaria",
    label: "Casa Solidária e Lavanderia",
    fotos: [
      "/assets/projetos/casa-solidaria-lavanderia-1.jpg",
      "/assets/projetos/casa-solidaria-lavanderia-2.jpg",
      "/assets/projetos/casa-solidaria-lavanderia-3.jpg",
      "/assets/projetos/casa-solidaria-lavanderia-4.jpg",
    ],
  },
  "rede-empreendedora": {
    key: "rede-empreendedora",
    label: "Rede Empreendedora",
    fotos: [
      "/assets/projetos/rede-empreendedora-1.jpg",
      "/assets/projetos/rede-empreendedora-2.jpg",
      "/assets/projetos/rede-empreendedora-3.jpg",
    ],
  },
  "guarda-chuva": {
    key: "guarda-chuva",
    label: "Projeto Guarda-Chuva",
    fotos: [
      "/assets/projetos/projeto-guarda-chuva-1.jpg",
      "/assets/projetos/projeto-guarda-chuva-2.jpg",
      "/assets/projetos/projeto-guarda-chuva-3.jpg",
    ],
  },
  "gurias-incriveis": {
    key: "gurias-incriveis",
    label: "Gurias Incríveis",
    fotos: [
      "/assets/projetos/gurias-incriveis-1.jpg",
      "/assets/projetos/gurias-incriveis-2.jpg",
      "/assets/projetos/gurias-incriveis-3.jpg",
    ],
  },
  "casa-artesao": {
    key: "casa-artesao",
    label: "Casa do Artesão",
    fotos: [
      "/assets/projetos/casa-do-artesao-1.jpg",
      "/assets/projetos/casa-do-artesao-2.jpg",
      "/assets/projetos/casa-do-artesao-3.jpg",
    ],
  },
  "varal-solidario": {
    key: "varal-solidario",
    label: "Varal Solidário",
    fotos: [
      "/assets/projetos/varal-solidario-1.jpg",
      "/assets/projetos/varal-solidario-2.jpg",
      "/assets/projetos/varal-solidario-3.jpg",
    ],
  },
  "sala-bem-me-quer": {
    key: "sala-bem-me-quer",
    label: "Sala Bem-Me-Quer",
    fotos: [
      "/assets/projetos/sala-bem-me-quer-1.jpg",
      "/assets/projetos/sala-bem-me-quer-2.jpg",
      "/assets/projetos/sala-bem-me-quer-3.jpg",
    ],
  },
  "doacao-gera-impacto": {
    key: "doacao-gera-impacto",
    label: "Doação Gera Impacto",
    fotos: [
      "/assets/projetos/doacao-gera-impacto-1.jpg",
      "/assets/projetos/doacao-gera-impacto-2.jpg",
      "/assets/projetos/doacao-gera-impacto-3.jpg",
    ],
  },
};
