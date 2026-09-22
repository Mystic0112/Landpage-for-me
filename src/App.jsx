import { ScrollProvider } from './lib/scroll.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Stack from './components/Stack.jsx'
import Projects from './components/Projects.jsx'
import Journey from './components/Journey.jsx'
import Extras from './components/Extras.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <ScrollProvider>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Journey />
        <Extras />
        <Contact />
      </main>
      <Footer />
    </ScrollProvider>
  )
}
