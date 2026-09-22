import { useRef } from 'react'
import { useTrack } from '../hooks/useTrack.js'
import { useReveal } from '../hooks/useReveal.js'
import { projetos } from '../data/profile.js'

const LIMITE_HORIZONTAL = 860

/**
 * Seção fixada (sticky): enquanto a página rola na vertical, a trilha de
 * projetos corre na horizontal. Abaixo de 860px o efeito é desligado e os
 * projetos viram uma lista vertical comum.
 */
export default function Projects() {
  const railRef = useRef(null)
  const barraRef = useRef(null)

  const wrapperRef = useTrack(
    (progress) => {
      const rail = railRef.current
      if (!rail) return

      if (window.innerWidth <= LIMITE_HORIZONTAL) {
        rail.style.transform = ''
        if (barraRef.current) barraRef.current.style.transform = 'scaleX(0)'
        return
      }

      const distancia = Math.max(0, rail.scrollWidth - window.innerWidth)
      rail.style.transform = `translate3d(${(-progress * distancia).toFixed(2)}px, 0, 0)`
      if (barraRef.current) {
        barraRef.current.style.transform = `scaleX(${progress.toFixed(3)})`
      }
    },
    { mode: 'pinned' },
  )

  return (
    <section className="projects" id="projetos" ref={wrapperRef}>
      <div className="projects-sticky">
        <div className="shell">
          <div className="projects-head">
            <span className="eyebrow">Projetos em destaque</span>
            <h2 className="section-title">
              Três sistemas, três <span className="accent">problemas reais</span>.
            </h2>
          </div>
        </div>

        <div className="projects-rail parallax-layer" ref={railRef}>
          {projetos.map((projeto) => (
            <ProjetoPainel key={projeto.id} projeto={projeto} />
          ))}
          <div className="projects-final">
            <p className="mono">// fim da trilha</p>
            <p>
              Mais código no GitHub — inclusive os experimentos que ainda não
              viraram produto.
            </p>
          </div>
        </div>

        <div className="projects-progress" aria-hidden="true">
          <span ref={barraRef} />
        </div>
      </div>
    </section>
  )
}

function ProjetoPainel({ projeto }) {
  const ref = useReveal({ threshold: 0.15 })

  const conteudo = (
    <>
      <div className="projeto-topo">
        <span className="projeto-indice">{projeto.indice}</span>
        <span className="projeto-etiqueta mono">{projeto.etiqueta}</span>
      </div>

      <h3 className="projeto-nome">{projeto.nome}</h3>
      <p className="projeto-tagline">{projeto.tagline}</p>
      <p className="projeto-descricao">{projeto.descricao}</p>

      <ul className="projeto-techs">
        {projeto.tecnologias.map((tech) => (
          <li key={tech} className="mono">
            {tech}
          </li>
        ))}
      </ul>

      <span className="projeto-status mono">
        {projeto.link ? '↗ ' : '● '}
        {projeto.status}
      </span>
    </>
  )

  return (
    <article ref={ref} className="projeto reveal" data-cursor="hot">
      {projeto.link ? (
        <a href={projeto.link} target="_blank" rel="noreferrer noopener" className="projeto-link">
          {conteudo}
        </a>
      ) : (
        conteudo
      )}
    </article>
  )
}
