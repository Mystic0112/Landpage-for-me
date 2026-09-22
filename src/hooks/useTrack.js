import { useEffect, useRef } from 'react'
import { useScroll } from '../lib/scroll.jsx'

/**
 * Acompanha o progresso de um elemento em relação à viewport.
 *
 * mode "through": 0 quando o topo do elemento encosta na base da tela e 1
 * quando a base dele sai por cima — usado em revelações graduais.
 * mode "pinned": 0 quando o elemento encosta no topo da tela e 1 quando sua
 * última tela de altura termina — usado nas seções com position: sticky.
 *
 * O callback recebe o progresso a cada frame e deve escrever direto no DOM.
 */
export function useTrack(onProgress, { mode = 'through' } = {}) {
  const ref = useRef(null)
  const scroll = useScroll()
  const callback = useRef(onProgress)
  callback.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let top = 0
    let height = 0

    const measure = () => {
      const rect = el.getBoundingClientRect()
      top = rect.top + window.scrollY
      height = rect.height
    }
    measure()

    let last = -1

    const unsubscribe = scroll.subscribe(({ y, vh }) => {
      if (!height) measure()

      let progress
      if (mode === 'pinned') {
        const span = Math.max(1, height - vh)
        progress = (y - top) / span
      } else {
        const span = Math.max(1, height + vh)
        progress = (y + vh - top) / span
      }

      progress = Math.min(1, Math.max(0, progress))
      const rounded = Math.round(progress * 1000) / 1000
      if (rounded === last) return
      last = rounded
      callback.current(rounded, el)
    })

    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    return () => {
      unsubscribe()
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [scroll, mode])

  return ref
}
