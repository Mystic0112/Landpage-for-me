import { useParallax } from '../hooks/useParallax.js'
import { useReveal } from '../hooks/useReveal.js'
import { skills } from '../data/profile.js'

const VELOCIDADES = [-0.05, 0.07, -0.11, 0.04]

/**
 * Grade de tecnologias: cada coluna sobe numa velocidade própria, então a
 * grade "respira" durante a rolagem em vez de se mover em bloco.
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
  // Abaixo de 640px a grade vira coluna única: o parallax por coluna só
  // desalinharia os cartões, então fica desligado.
  const parallaxRef = useParallax({
    speed: VELOCIDADES[indice % VELOCIDADES.length],
    disableBelow: 640,
  })
  const revealRef = useReveal({ threshold: 0.3 })

  const inclinar = (event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(x * 12).toFixed(2)}deg`)
    el.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const repousar = (event) => {
    const el = event.currentTarget
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div className="parallax-layer" ref={parallaxRef}>
      <article
        ref={revealRef}
        className="skill-card reveal"
        onPointerMove={inclinar}
        onPointerLeave={repousar}
        data-cursor="hot"
      >
        <span className="skill-grupo mono">{skill.grupo}</span>
        <h3>{skill.nome}</h3>
        <span className="skill-num mono">{String(indice + 1).padStart(2, '0')}</span>
      </article>
    </div>
  )
}
