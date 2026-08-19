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
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./pages/AdminPanel";

function App() {
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
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}

export default App;
