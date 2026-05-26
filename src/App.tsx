import Navigation from './components/Navigation';
import FloatingShapes from './components/FloatingShapes';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-white overflow-x-hidden">
      <FloatingShapes />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
