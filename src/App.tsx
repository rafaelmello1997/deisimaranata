import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoImpacto } from "./components/VideoImpacto";
import { QuemE } from "./components/QuemE";
import { EnchenteReconstrucao } from "./components/EnchenteReconstrucao";
import { OElo } from "./components/OElo";
import { Bandeiras } from "./components/Bandeiras";
import { Projetos } from "./components/Projetos";
import { Depoimentos } from "./components/Depoimentos";
import { EspacoMaranata } from "./components/EspacoMaranata";
import { Galeria } from "./components/Galeria";
import { GeradorFoto } from "./components/GeradorFoto";
import { Figurinhas } from "./components/Figurinhas";
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./pages/AdminPanel";

function App() {
  // ao abrir com #hash na url (link compartilhado), o navegador tenta rolar
  // pra secao antes do React montar o conteudo, entao a rolagem nativa falha
  // e a pagina fica no topo. Refaz a rolagem manualmente depois do primeiro render.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const scrollToHash = () => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "instant" });
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    window.addEventListener("load", scrollToHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", scrollToHash);
    };
  }, []);

  // roteamento simples por path -- sem lib de router pra nao pesar o site publico.
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminPanel />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoImpacto />
        <QuemE />
        <EnchenteReconstrucao />
        <OElo />
        <Bandeiras />
        <Projetos />
        <Depoimentos />
        <EspacoMaranata />
        <Galeria />
        <GeradorFoto />
        <Figurinhas />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}

export default App;
