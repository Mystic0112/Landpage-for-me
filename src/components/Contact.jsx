import { useState } from 'react'
import { useParallax } from '../hooks/useParallax.js'
import { useReveal } from '../hooks/useReveal.js'
import { profile } from '../data/profile.js'

/** Fechamento com halos em parallax e os contatos do currículo. */
export default function Contact() {
  const [copiado, setCopiado] = useState(false)

  const haloRef = useParallax({ speed: 0.3 })
  const marcaRef = useParallax({ speed: -0.16 })
  const cabecalhoRef = useReveal({ threshold: 0.3 })

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section contact" id="contato">
      <div className="contact-halo parallax-layer" ref={haloRef} aria-hidden="true" />

      <div className="shell contact-inner">
        <div className="reveal" ref={cabecalhoRef}>
          <span className="eyebrow">Contato</span>
          <h2 className="contact-title">
            Bora construir <span className="accent">algo</span> juntos?
          </h2>
          <p className="lead">
            Aberto a estágio ou posição Júnior como Desenvolvedor Backend.
            Respondo rápido — e gosto de conversar sobre arquitetura.
          </p>
        </div>

        <div className="contact-acoes">
          <a className="botao botao-primario" href={`mailto:${profile.email}`} data-cursor="hot">
            {profile.email}
          </a>
          <button type="button" className="botao botao-ghost" onClick={copiarEmail}>
            {copiado ? 'E-mail copiado ✓' : 'Copiar e-mail'}
          </button>
        </div>

        <ul className="contact-lista">
          <li>
            <span className="mono">Telefone</span>
            <a href={`tel:${profile.telefoneLink}`}>{profile.telefone}</a>
          </li>
          <li>
            <span className="mono">GitHub</span>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer noopener">
              /{profile.github}
            </a>
          </li>
          <li>
            <span className="mono">Localização</span>
            <span>{profile.local}</span>
          </li>
          <li>
            <span className="mono">Formação</span>
            <span>ADS — UNINASSAU (2026)</span>
          </li>
        </ul>
      </div>

      <div className="contact-marca parallax-layer" ref={marcaRef} aria-hidden="true">
        Hélio Vinícius
      </div>
    </section>
  )
}
