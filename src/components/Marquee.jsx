import { useEffect, useRef } from 'react'
import { useScroll } from '../lib/scroll.jsx'

const ITENS = [
  'PHP',
  'Laravel',
  'Arquitetura de Software',
  'Docker',
  'Kubernetes',
  'Integrações com IA',
  'MCP',
  'Webhooks',
  'Sockets',
  'TypeScript',
]

/**
 * Faixa infinita cuja velocidade e inclinação respondem à rolagem:
 * parada ela desliza sozinha, e acelera no sentido do scroll.
 */
export default function Marquee() {
  const trackRef = useRef(null)
  const scroll = useScroll()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let deslocamento = 0
    let largura = track.scrollWidth / 2
    const medir = () => {
      largura = track.scrollWidth / 2
    }
    medir()
    window.addEventListener('resize', medir)

    const unsubscribe = scroll.subscribe(({ velocity, direction }) => {
      const base = 0.6
      const impulso = Math.min(28, Math.abs(velocity) * 0.35)
      deslocamento -= (base + impulso) * (direction >= 0 ? 1 : -1)

      // Reinicia o deslocamento ao completar metade da faixa (a cópia).
      if (deslocamento <= -largura) deslocamento += largura
      if (deslocamento > 0) deslocamento -= largura

      const inclinacao = Math.max(-6, Math.min(6, velocity * 0.12))
      track.style.transform = `translate3d(${deslocamento.toFixed(2)}px, 0, 0) skewX(${inclinacao.toFixed(2)}deg)`
    })

    return () => {
      unsubscribe()
      window.removeEventListener('resize', medir)
    }
  }, [scroll])

  const lista = [...ITENS, ...ITENS]

  return (
    <div className="marquee" aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {lista.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
