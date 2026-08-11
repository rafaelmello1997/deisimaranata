import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoImpacto } from "./components/VideoImpacto";
import { ValoresMarca } from "./components/ValoresMarca";
import { Projetos } from "./components/Projetos";
import { Depoimentos } from "./components/Depoimentos";
import { Galeria } from "./components/Galeria";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoImpacto />
        <ValoresMarca />
        <Projetos />
        <Depoimentos />
        <Galeria />
      </main>
      <Footer />
    </>
  );
}

export default App;
