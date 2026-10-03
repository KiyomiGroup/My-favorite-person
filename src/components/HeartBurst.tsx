import { useMemo } from 'react'
import type { CSSProperties } from 'react'

const BITS = ['❤️', '💗', '✨', '💖', '⭐']

/** One-shot celebration. Remount it (change `burstKey`) to fire it again. */
export function HeartBurst({ burstKey }: { burstKey: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 22 + Math.random() * 0.4
        const dist = 90 + Math.random() * 130
        return {
          ch: BITS[i % BITS.length],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 40,
          delay: Math.random() * 0.12,
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey],
  )
  return (
    <div className="burst" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, animationDelay: `${b.delay}s` } as CSSProperties}
        >
          {b.ch}
        </span>
      ))}
    </div>
  )
}
