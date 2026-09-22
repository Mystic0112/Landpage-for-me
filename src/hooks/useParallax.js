import { useEffect, useRef } from 'react'
import { prefersReducedMotion, useScroll } from '../lib/scroll.jsx'

/**
 * Desloca um elemento em relação à rolagem.
 *
 * `speed` é a fração do deslocamento do scroll aplicada ao elemento:
 * valores positivos fazem a camada "ficar para trás" (fundo), negativos
 * fazem passar mais rápido que a página (frente). O cálculo parte do centro
 * do elemento, então nada salta quando a seção entra na tela.
 */
export function useParallax({
  speed = 0.15,
  axis = 'y',
  rotate = 0,
  scale = 0,
  clamp = null,
  disabled = false,
  anchor = 'center',
  disableBelow = 0,
} = {}) {
  const ref = useRef(null)
  const scroll = useScroll()

  useEffect(() => {
    const el = ref.current
    if (!el || disabled || prefersReducedMotion()) return
    if (disableBelow && window.innerWidth <= disableBelow) return

    let top = 0
    let height = 0

    const measure = () => {
      const rect = el.getBoundingClientRect()
      top = rect.top + window.scrollY
      height = rect.height
    }

    // A medição roda com o transform zerado para não acumular o próprio
    // deslocamento a cada recálculo.
    const remeasure = () => {
      const previous = el.style.transform
      el.style.transform = ''
      measure()
      el.style.transform = previous
    }

    remeasure()

    let lastFrame = null

    const unsubscribe = scroll.subscribe(({ y, vh }) => {
      if (!height) remeasure()

      // anchor 'center': o deslocamento é zero quando o elemento está no
      // meio da tela — ideal para seções no meio da página.
      // anchor 'scroll': o deslocamento é zero no topo da página — é o que
      // evita que as camadas do hero já nasçam fora do lugar.
      const center = top + height / 2
      const delta = anchor === 'scroll' ? y : y + vh / 2 - center

      let shift = delta * speed
      if (clamp !== null) {
        shift = Math.max(-clamp, Math.min(clamp, shift))
      }

      const rounded = Math.round(shift * 100) / 100
      const rotation = rotate ? (delta / vh) * rotate : 0
      const scaling = scale ? 1 + (delta / vh) * scale : 1

      const frame = `${rounded}|${rotation}|${scaling}`
      if (frame === lastFrame) return
      lastFrame = frame

      const translate =
        axis === 'x'
          ? `translate3d(${rounded}px, 0, 0)`
          : `translate3d(0, ${rounded}px, 0)`

      el.style.transform =
        translate +
        (rotation ? ` rotate(${rotation.toFixed(3)}deg)` : '') +
        (scale ? ` scale(${scaling.toFixed(4)})` : '')
    })

    const onResize = () => remeasure()
    window.addEventListener('resize', onResize)

    const ro = new ResizeObserver(remeasure)
    ro.observe(el)

    return () => {
      unsubscribe()
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      el.style.transform = ''
    }
  }, [scroll, speed, axis, rotate, scale, clamp, disabled, anchor, disableBelow])

  return ref
}
