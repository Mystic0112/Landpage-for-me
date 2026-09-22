import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useParallax } from '../hooks/useParallax.js'
import { profile } from '../data/profile.js'

const FOTO = `${import.meta.env.BASE_URL}helio.webp`

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 20 },
  },
}

/**
 * Abertura em camadas: grade, halos, marca d'água e o próprio nome se movem
 * em velocidades diferentes. A entrada é orquestrada pelo motion (springs);
 * o parallax contínuo segue no motor único de scroll.
 */
export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  // Saída da primeira tela: só opacity (composited) — nada de blur por frame.
  const conteudoOpacity = useTransform(() => {
    const vh = window.innerHeight
    return Math.max(0.05, 1 - (scrollY.get() / (vh * 0.9)) * 0.95)
  })
  const cueOpacity = useTransform(() =>
    Math.max(0, 1 - scrollY.get() / (window.innerHeight * 0.3)),
  )

  // anchor 'scroll' mantém todas as camadas no lugar com a página no topo;
  // elas só se separam conforme a rolagem avança.
  const gradeRef = useParallax({ speed: 0.12, anchor: 'scroll' })
  const haloARef = useParallax({ speed: 0.3, anchor: 'scroll' })
  const haloBRef = useParallax({ speed: -0.18, anchor: 'scroll' })
  const marcaRef = useParallax({ speed: 0.42, anchor: 'scroll' })
  const linha1Ref = useParallax({ speed: -0.06, anchor: 'scroll' })
  const linha2Ref = useParallax({ speed: -0.16, anchor: 'scroll' })
  const retratoRef = useParallax({ speed: -0.22, rotate: -2, anchor: 'scroll', disableBelow: 860 })

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

      <m.div
        className="hero-content shell"
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate="visible"
        style={reduce ? undefined : { opacity: conteudoOpacity }}
      >
        <m.div className="hero-chip" variants={item}>
          <span className="pulse" />
          Disponível para estágio ou posição Júnior
        </m.div>

        <h1 className="hero-title">
          <span ref={linha1Ref} className="hero-title-line parallax-layer">
            <m.span className="hero-title-inner" variants={item}>
              Hélio
            </m.span>
          </span>
          <span ref={linha2Ref} className="hero-title-line hero-title-outline parallax-layer">
            <m.span className="hero-title-inner" variants={item}>
              Vinícius
            </m.span>
          </span>
        </h1>

        <m.div className="hero-meta" variants={item}>
          <p className="hero-role mono">{profile.cargo}</p>
          <p className="hero-sub">
            Backend em PHP e Laravel, integrações com Inteligência Artificial e
            sistemas multi-serviços — de <span className="accent">{profile.local}</span>.
          </p>
        </m.div>

        <div ref={retratoRef} className="hero-portrait parallax-layer">
          <m.figure className="hero-portrait-frame" variants={item}>
            <img
              src={FOTO}
              alt="Retrato de Hélio Vinícius, desenvolvedor PHP e Laravel"
              width="800"
              height="1047"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </m.figure>
        </div>
      </m.div>

      <m.div
        className="hero-cue"
        aria-hidden="true"
        style={reduce ? undefined : { opacity: cueOpacity }}
      >
        <span className="mono">role</span>
        <span className="hero-cue-line" />
      </m.div>
    </section>
  )
}
