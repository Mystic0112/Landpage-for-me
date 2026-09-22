import { useEffect, useRef } from 'react'

/**
 * Adiciona a classe `is-visible` quando o elemento entra na tela.
 * A animação em si fica no CSS, que respeita prefers-reduced-motion.
 */
export function useReveal({ threshold = 0.2, once = true, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return ref
}
