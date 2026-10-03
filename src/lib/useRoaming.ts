import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export interface Pos {
  x: number
  y: number
}

/**
 * A button that can jump to random spots, but only INSIDE its arena element.
 * Attach `arenaRef` to the container and `btnRef` to the button, then apply
 * `transform: translate(pos.x, pos.y)` to the button (absolutely positioned at 0,0).
 */
export function useRoaming(remeasureKey: unknown = null) {
  const arenaRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState<Pos | null>(null)

  const bounds = () => {
    const a = arenaRef.current
    const b = btnRef.current
    if (!a || !b) return null
    return { maxX: Math.max(0, a.clientWidth - b.offsetWidth), maxY: Math.max(0, a.clientHeight - b.offsetHeight) }
  }

  useLayoutEffect(() => {
    const place = () => {
      const bd = bounds()
      if (!bd) return
      setPos((p) => (p ? { x: Math.min(p.x, bd.maxX), y: Math.min(p.y, bd.maxY) } : { x: bd.maxX / 2, y: bd.maxY / 2 }))
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [remeasureKey])

  const move = useCallback(() => {
    const bd = bounds()
    if (!bd) return
    setPos((prev) => {
      let best: Pos = { x: Math.random() * bd.maxX, y: Math.random() * bd.maxY }
      let bestDist = prev ? Math.hypot(best.x - prev.x, best.y - prev.y) : 0
      for (let i = 0; i < 6; i++) {
        const c = { x: Math.random() * bd.maxX, y: Math.random() * bd.maxY }
        const d = prev ? Math.hypot(c.x - prev.x, c.y - prev.y) : 0
        if (d > bestDist) {
          best = c
          bestDist = d
        }
      }
      return best
    })
  }, [])

  return { arenaRef, btnRef, pos, move }
}
