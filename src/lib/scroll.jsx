import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import Lenis from 'lenis'

/**
 * Motor de scroll da página.
 *
 * Um único loop de requestAnimationFrame alimenta todos os efeitos de
 * parallax. Os assinantes recebem o estado do scroll a cada frame e escrevem
 * direto no DOM, sem disparar re-render do React — é o que mantém a rolagem
 * estável mesmo com dezenas de camadas se movendo ao mesmo tempo.
 */

const ScrollContext = createContext(null)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ScrollProvider({ children }) {
  const listeners = useRef(new Set())
  const state = useRef({
    y: 0,
    velocity: 0,
    direction: 1,
    progress: 0,
    vh: 0,
    vw: 0,
    docHeight: 0,
  })

  const api = useMemo(
    () => ({
      subscribe(fn) {
        listeners.current.add(fn)
        // Entrega o estado atual imediatamente para o assinante já nascer
        // posicionado, sem esperar o próximo frame.
        fn(state.current)
        return () => listeners.current.delete(fn)
      },
      get state() {
        return state.current
      },
      scrollTo(target) {
        const lenis = window.__lenis
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.4 })
          return
        }
        const el =
          typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
    }),
    [],
  )

  useEffect(() => {
    const reduced = prefersReducedMotion()

    const measure = () => {
      state.current.vh = window.innerHeight
      state.current.vw = window.innerWidth
      state.current.docHeight = document.documentElement.scrollHeight
    }
    measure()

    const emit = () => {
      const s = state.current
      const max = Math.max(1, s.docHeight - s.vh)
      s.progress = Math.min(1, Math.max(0, s.y / max))
      listeners.current.forEach((fn) => fn(s))
    }

    let lenis = null
    let rafId = 0

    if (reduced) {
      // Sem smooth scroll: apenas acompanha a posição nativa da página.
      const onScroll = () => {
        const y = window.scrollY
        state.current.direction = y > state.current.y ? 1 : -1
        state.current.velocity = 0
        state.current.y = y
        emit()
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      const onResize = () => {
        measure()
        onScroll()
      }
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      }
    }

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    lenis.on('scroll', ({ scroll, velocity, direction }) => {
      state.current.y = scroll
      state.current.velocity = velocity
      state.current.direction = direction || state.current.direction
    })

    const raf = (time) => {
      lenis.raf(time)
      emit()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onResize = () => {
      measure()
      lenis.resize()
    }
    window.addEventListener('resize', onResize)

    // O conteúdo muda de altura conforme fontes e imagens carregam.
    const ro = new ResizeObserver(() => {
      measure()
      lenis.resize()
    })
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export function useScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll precisa estar dentro de <ScrollProvider>')
  return ctx
}
