import { m, useScroll } from 'motion/react'

/** Barra fina no topo indicando o quanto da página já foi percorrido. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="scroll-progress" aria-hidden="true">
      <m.span style={{ scaleX: scrollYProgress }} />
    </div>
  )
}
