import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoImpacto } from "./components/VideoImpacto";
import { QuemE } from "./components/QuemE";
import { OElo } from "./components/OElo";
import { Bandeiras } from "./components/Bandeiras";
import { Projetos } from "./components/Projetos";
import { Depoimentos } from "./components/Depoimentos";
import { EspacoMaranata } from "./components/EspacoMaranata";
import { Galeria } from "./components/Galeria";
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoImpacto />
        <QuemE />
        <OElo />
        <Bandeiras />
        <Projetos />
        <Depoimentos />
        <EspacoMaranata />
        <Galeria />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}

export default App;
