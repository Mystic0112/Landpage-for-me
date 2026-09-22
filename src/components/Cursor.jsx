import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/scroll.jsx'

/**
 * Halo que segue o ponteiro com atraso (lerp) e cresce sobre links.
 * Só existe em dispositivos com mouse de verdade.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let raf = 0
    let active = false

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!active) {
        active = true
        document.body.classList.add('has-cursor')
      }
    }

    const onOver = (event) => {
      const interactive = event.target.closest('a, button, [data-cursor]')
      ring.classList.toggle('is-hot', Boolean(interactive))
    }

    const loop = () => {
      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
