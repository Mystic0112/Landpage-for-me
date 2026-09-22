import { useReveal } from '../hooks/useReveal.js'
import { useParallax } from '../hooks/useParallax.js'
import { idiomas, softSkills } from '../data/profile.js'

/** Idiomas com barras animadas na entrada + soft skills em cápsulas. */
export default function Extras() {
  const cabecalhoRef = useReveal()
  const capsulasRef = useParallax({ speed: -0.07 })

  return (
    <section className="section extras">
      <div className="shell extras-grid">
        <div className="extras-col">
          <div className="reveal" ref={cabecalhoRef}>
            <span className="eyebrow">Idiomas</span>
            <h2 className="extras-title">Comunicação sem fronteira.</h2>
          </div>

          <ul className="idiomas">
            {idiomas.map((idioma, i) => (
              <IdiomaItem key={idioma.nome} idioma={idioma} indice={i} />
            ))}
          </ul>
        </div>

        <div className="extras-col">
          <span className="eyebrow">Soft skills</span>
          <h2 className="extras-title">Como eu trabalho em time.</h2>

          <ul className="soft-skills parallax-layer" ref={capsulasRef}>
            {softSkills.map((skill, i) => (
              <SoftSkill key={skill} skill={skill} indice={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function IdiomaItem({ idioma, indice }) {
  const ref = useReveal({ threshold: 0.5 })

  // A largura final vai por variável CSS: a barra cresce quando a classe
  // is-visible entra, sem JavaScript de animação.
  return (
    <li
      ref={ref}
      className={`idioma reveal reveal-delay-${indice + 1}`}
      style={{ '--nivel': idioma.progresso / 100 }}
    >
      <div className="idioma-topo">
        <strong>{idioma.nome}</strong>
        <span className="mono">{idioma.nivel}</span>
      </div>
      <div className="idioma-barra">
        <span />
      </div>
    </li>
  )
}

function SoftSkill({ skill, indice }) {
  const ref = useReveal({ threshold: 0.5 })
  return (
    <li ref={ref} className={`soft-skill reveal reveal-delay-${(indice % 4) + 1}`}>
      {skill}
    </li>
  )
}
