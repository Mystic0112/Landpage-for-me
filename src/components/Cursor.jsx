import { useEffect, useRef } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'
import { prefersReducedMotion } from '../lib/scroll.jsx'

/**
 * Halo que segue o ponteiro: o ponto acompanha direto e o anel vem num
 * spring do motion — a animação dorme sozinha quando o ponteiro para,
 * sem loop de requestAnimationFrame permanente.
 */
export default function Cursor() {
  const ringRef = useRef(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.7 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.7 })

  const fine =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !prefersReducedMotion()

  useEffect(() => {
    if (!fine) return

    let active = false

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!active) {
        active = true
        document.body.classList.add('has-cursor')
      }
    }

    const onOver = (event) => {
      const interactive = event.target.closest('a, button, [data-cursor]')
      ringRef.current?.classList.toggle('is-hot', Boolean(interactive))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.body.classList.remove('has-cursor')
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <>
      <m.span className="cursor-dot" aria-hidden="true" style={{ x, y }} />
      <m.span
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
