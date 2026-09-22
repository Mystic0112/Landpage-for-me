import { useEffect, useRef, useState } from 'react'
import { useScroll } from '../lib/scroll.jsx'
import { profile, secoes } from '../data/profile.js'

/**
 * Cabeçalho fixo + trilha de marcadores das seções.
 * A seção ativa é calculada no mesmo loop de scroll, sem observers extras.
 */
export default function Nav() {
  const scroll = useScroll()
  const headerRef = useRef(null)
  const [ativa, setAtiva] = useState(secoes[0].id)

  useEffect(() => {
    const header = headerRef.current
    let ultimaAtiva = ''
    let topos = []
    let alturaMedida = 0

    // Medir getBoundingClientRect de 6 seções a cada frame forçava layout
    // durante o scroll inteiro. Os topos são cacheados e só remedidos quando
    // a altura do documento muda (fontes/imagens) ou no resize.
    const medir = () => {
      topos = secoes.map((secao) => {
        const el = document.getElementById(secao.id)
        return {
          id: secao.id,
          top: el ? el.getBoundingClientRect().top + window.scrollY : 0,
        }
      })
    }
    medir()
    window.addEventListener('resize', medir)

    const unsubscribe = scroll.subscribe(({ y, vh, docHeight }) => {
      if (docHeight !== alturaMedida) {
        alturaMedida = docHeight
        medir()
      }

      if (header) header.classList.toggle('is-stuck', y > vh * 0.5)

      const linha = y + vh * 0.45
      let atual = topos[0]?.id

      for (const topo of topos) {
        if (linha >= topo.top) atual = topo.id
      }

      if (atual !== ultimaAtiva) {
        ultimaAtiva = atual
        setAtiva(atual)
      }
    })

    return () => {
      unsubscribe()
      window.removeEventListener('resize', medir)
    }
  }, [scroll])

  const irPara = (event, id) => {
    event.preventDefault()
    scroll.scrollTo(`#${id}`)
  }

  return (
    <>
      <header ref={headerRef} className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#inicio" onClick={(e) => irPara(e, 'inicio')}>
            <span className="nav-brand-mark">HV</span>
            <span className="nav-brand-text">
              {profile.nome}
              <em>{profile.cargo}</em>
            </span>
          </a>

          <nav className="nav-links" aria-label="Seções da página">
            {secoes.slice(1, -1).map((secao) => (
              <a
                key={secao.id}
                href={`#${secao.id}`}
                onClick={(e) => irPara(e, secao.id)}
                className={ativa === secao.id ? 'is-active' : undefined}
              >
                {secao.label}
              </a>
            ))}
          </nav>

          <a
            className="nav-cta"
            href={`mailto:${profile.email}`}
          >
            Vamos conversar
          </a>
        </div>
      </header>

      <aside className="rail" aria-hidden="true">
        {secoes.map((secao) => (
          <button
            key={secao.id}
            type="button"
            className={ativa === secao.id ? 'is-active' : undefined}
            onClick={() => scroll.scrollTo(`#${secao.id}`)}
            tabIndex={-1}
          >
            <span className="rail-label">{secao.label}</span>
            <span className="rail-dot" />
          </button>
        ))}
      </aside>
    </>
  )
}
