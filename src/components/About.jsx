import { useRef } from 'react'
import { useTrack } from '../hooks/useTrack.js'
import { useParallax } from '../hooks/useParallax.js'
import { useReveal } from '../hooks/useReveal.js'
import { profile, qualificacoes, destaques } from '../data/profile.js'

const PALAVRAS = profile.objetivo.split(' ')

/**
 * O objetivo do currículo é iluminado palavra a palavra conforme a seção
 * atravessa a tela — o texto vira o próprio indicador de progresso.
 */
export default function About() {
  const palavrasRef = useRef([])

  const textoRef = useTrack((progress) => {
    const total = palavrasRef.current.length
    if (!total) return

    // A leitura acontece entre 15% e 75% da passagem da seção.
    const janela = (progress - 0.15) / 0.6
    const ativa = janela * total

    palavrasRef.current.forEach((span, i) => {
      if (!span) return
      const nivel = Math.min(1, Math.max(0, ativa - i))
      // Base 0.35: mesmo "apagada", a palavra continua legível (contraste AA).
      span.style.opacity = String(0.35 + nivel * 0.65)
    })
  })

  const colunaRef = useParallax({ speed: -0.1 })
  const numerosRef = useParallax({ speed: 0.08 })
  const tituloRef = useReveal()

  return (
    <section className="section about" id="sobre">
      <div className="shell about-grid">
        <div className="about-head reveal" ref={tituloRef}>
          <span className="eyebrow">Sobre</span>
          <h2 className="section-title">
            Backend com olho em <span className="accent">escala</span> e boas práticas.
          </h2>
        </div>

        <div className="about-text" ref={textoRef}>
          <p className="about-objetivo">
            {PALAVRAS.map((palavra, i) => (
              <span
                key={`${palavra}-${i}`}
                ref={(el) => {
                  palavrasRef.current[i] = el
                }}
              >
                {palavra}{' '}
              </span>
            ))}
          </p>
          <p className="lead about-complemento">{profile.objetivoComplemento}</p>
        </div>

        <div className="about-cards parallax-layer" ref={colunaRef}>
          {qualificacoes.map((item, i) => (
            <QualificacaoCard key={item.titulo} item={item} indice={i} />
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="about-numeros parallax-layer" ref={numerosRef}>
          {destaques.map((destaque) => (
            <div key={destaque.label} className="numero">
              <strong>
                {destaque.valor}
                {destaque.unidade && <em>{destaque.unidade}</em>}
              </strong>
              <span>{destaque.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QualificacaoCard({ item, indice }) {
  const ref = useReveal()
  return (
    <article ref={ref} className={`qual-card reveal reveal-delay-${indice + 1}`}>
      <span className="qual-index mono">0{indice + 1}</span>
      <h3>{item.titulo}</h3>
      <p>{item.texto}</p>
    </article>
  )
}
