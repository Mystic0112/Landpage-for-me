import { useParallax } from '../hooks/useParallax.js'
import { useReveal } from '../hooks/useReveal.js'
import { skills } from '../data/profile.js'

/**
 * Grade de tecnologias com reveal em cascata e tilt no hover.
 * O parallax por cartão foi removido: eram 12 camadas de composição a mais
 * por um deslocamento quase imperceptível.
 */
export default function Stack() {
  const fundoRef = useParallax({ speed: 0.24 })
  const cabecalhoRef = useReveal()

  return (
    <section className="section stack" id="stack">
      <div className="stack-bg parallax-layer" ref={fundoRef} aria-hidden="true">
        Laravel
      </div>

      <div className="shell">
        <div className="stack-head reveal" ref={cabecalhoRef}>
          <span className="eyebrow">Technical skills</span>
          <h2 className="section-title">
            A stack que uso pra <span className="accent">construir</span> e sustentar.
          </h2>
          <p className="lead">
            Do código ao deploy: linguagem e framework no núcleo, arquitetura
            para organizar, infraestrutura para escalar e IA integrada onde
            agrega de verdade.
          </p>
        </div>

        <div className="stack-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.nome} skill={skill} indice={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, indice }) {
  const revealRef = useReveal({ threshold: 0.3 })

  const inclinar = (event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(x * 12).toFixed(2)}deg`)
  }

  const repousar = (event) => {
    const el = event.currentTarget
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <article
      ref={revealRef}
      className="skill-card reveal"
      onPointerMove={inclinar}
      onPointerLeave={repousar}    >
      <span className="skill-grupo mono">{skill.grupo}</span>
      <h3>{skill.nome}</h3>
      <span className="skill-num mono">{String(indice + 1).padStart(2, '0')}</span>
    </article>
  )
}
