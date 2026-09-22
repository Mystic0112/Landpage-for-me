import { useRef } from 'react'
import { useTrack } from '../hooks/useTrack.js'
import { useReveal } from '../hooks/useReveal.js'
import { useParallax } from '../hooks/useParallax.js'
import { trajetoria } from '../data/profile.js'

/**
 * Linha do tempo com um traço que se preenche conforme a seção é percorrida.
 */
export default function Journey() {
  const tracoRef = useRef(null)

  const listaRef = useTrack((progress) => {
    const traco = tracoRef.current
    if (!traco) return
    // O traço adianta um pouco a leitura para chegar junto com cada item.
    const preenchimento = Math.min(1, progress * 1.45)
    traco.style.transform = `scaleY(${preenchimento.toFixed(3)})`
  })

  const fundoRef = useParallax({ speed: 0.18 })
  const cabecalhoRef = useReveal()

  return (
    <section className="section journey" id="trajetoria">
      <div className="journey-glow parallax-layer" ref={fundoRef} aria-hidden="true" />

      <div className="shell">
        <div className="journey-head reveal" ref={cabecalhoRef}>
          <span className="eyebrow">Experiência e aperfeiçoamento</span>
          <h2 className="section-title">
            O caminho até aqui — e o que vem <span className="accent">agora</span>.
          </h2>
        </div>

        <div className="journey-list" ref={listaRef}>
          <div className="journey-line" aria-hidden="true">
            <span ref={tracoRef} />
          </div>

          {trajetoria.map((item, i) => (
            <JourneyItem key={item.titulo} item={item} indice={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JourneyItem({ item, indice }) {
  const ref = useReveal({ threshold: 0.4 })
  const parallaxRef = useParallax({ speed: indice % 2 === 0 ? -0.04 : 0.04 })

  return (
    <div className="parallax-layer journey-slot" ref={parallaxRef}>
      <article ref={ref} className="journey-item reveal">
        <span className="journey-marker" aria-hidden="true" />
        <span className="journey-periodo mono">{item.periodo}</span>
        <h3>{item.titulo}</h3>
        <p>{item.detalhe}</p>
      </article>
    </div>
  )
}
