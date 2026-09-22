import { useEffect, useRef } from 'react'
import { useScroll } from '../lib/scroll.jsx'

/** Barra fina no topo indicando o quanto da página já foi percorrido. */
export default function ScrollProgress() {
  const barRef = useRef(null)
  const scroll = useScroll()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    return scroll.subscribe(({ progress }) => {
      bar.style.transform = `scaleX(${progress})`
    })
  }, [scroll])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  )
}
