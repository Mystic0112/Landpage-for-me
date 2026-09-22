import { useEffect, useRef } from 'react'
import { useScroll } from '../lib/scroll.jsx'
import { useParallax } from '../hooks/useParallax.js'
import { profile } from '../data/profile.js'

/**
 * Abertura em camadas: grade, halos, marca d'água e o próprio nome se movem
 * em velocidades diferentes, criando a profundidade principal da página.
 */
export default function Hero() {
  const scroll = useScroll()
  const contentRef = useRef(null)
  const cueRef = useRef(null)

  // anchor 'scroll' mantém todas as camadas no lugar com a página no topo;
  // elas só se separam conforme a rolagem avança.
  const gradeRef = useParallax({ speed: 0.12, anchor: 'scroll' })
  const haloARef = useParallax({ speed: 0.3, anchor: 'scroll' })
  const haloBRef = useParallax({ speed: -0.18, anchor: 'scroll' })
  const marcaRef = useParallax({ speed: 0.42, anchor: 'scroll' })
  const linha1Ref = useParallax({ speed: -0.06, anchor: 'scroll' })
  const linha2Ref = useParallax({ speed: -0.16, anchor: 'scroll' })
  const cardRef = useParallax({ speed: -0.22, rotate: -2.5, anchor: 'scroll', disableBelow: 860 })
  const chipRef = useParallax({ speed: -0.3, anchor: 'scroll', disableBelow: 860 })

  // O conteúdo perde nitidez conforme a primeira tela sai de cena.
  useEffect(() => {
    const content = contentRef.current
    const cue = cueRef.current

    return scroll.subscribe(({ y, vh }) => {
      const saida = Math.min(1, Math.max(0, y / (vh * 0.9)))
      if (content) {
        content.style.opacity = String(1 - saida * 0.95)
        content.style.filter = `blur(${(saida * 7).toFixed(2)}px)`
      }
      if (cue) {
        cue.style.opacity = String(Math.max(0, 1 - y / (vh * 0.3)))
      }
    })
  }, [scroll])

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true">
        <div ref={gradeRef} className="hero-grid parallax-layer" />
        <div ref={haloARef} className="hero-halo hero-halo-a parallax-layer" />
        <div ref={haloBRef} className="hero-halo hero-halo-b parallax-layer" />
        <div ref={marcaRef} className="hero-watermark parallax-layer">
          &lt;?php
        </div>
      </div>

      <div className="hero-content shell" ref={contentRef}>
        <div ref={chipRef} className="hero-chip parallax-layer">
          <span className="pulse" />
          Disponível para estágio ou posição Júnior
        </div>

        <h1 className="hero-title">
          <span ref={linha1Ref} className="hero-title-line parallax-layer">
            Hélio
          </span>
          <span ref={linha2Ref} className="hero-title-line hero-title-outline parallax-layer">
            Vinícius
          </span>
        </h1>

        <div className="hero-meta">
          <p className="hero-role mono">{profile.cargo}</p>
          <p className="hero-sub">
            Backend em PHP e Laravel, integrações com Inteligência Artificial e
            sistemas multi-serviços — de <span className="accent">{profile.local}</span>.
          </p>
        </div>

        <div ref={cardRef} className="hero-card parallax-layer" aria-hidden="true">
          <div className="hero-card-bar">
            <span /> <span /> <span />
            <em className="mono">CoachKit/app/Services/TreinoService.php</em>
          </div>
          <pre className="mono">
{`public function gerar(Aluno $aluno): Plano
{
    $contexto = $this->perfil->montar($aluno);

    return $this->ia
        ->viaMcp('coachkit.treinos')
        ->sugerir($contexto)
        ->paraRevisaoDoProfissional();
}`}
          </pre>
        </div>
      </div>

      <div ref={cueRef} className="hero-cue" aria-hidden="true">
        <span className="mono">role</span>
        <span className="hero-cue-line" />
      </div>
    </section>
  )
}
