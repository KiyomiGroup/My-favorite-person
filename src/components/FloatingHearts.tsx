import type { CSSProperties } from 'react'
import { Heart } from './Heart'

const HEARTS = [
  { left: 6, size: 18, delay: 0, y: 12 },
  { left: 18, size: 26, delay: 4, y: 62 },
  { left: 31, size: 16, delay: 9, y: 30 },
  { left: 44, size: 22, delay: 2, y: 80 },
  { left: 57, size: 14, delay: 7, y: 8 },
  { left: 69, size: 24, delay: 11, y: 48 },
  { left: 81, size: 18, delay: 5, y: 72 },
  { left: 92, size: 22, delay: 13, y: 22 },
]

export function FloatingHearts({ slow = false }: { slow?: boolean }) {
  return (
    <div className={`floaters${slow ? ' floaters--slow' : ''}`} aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="floater"
          style={{ left: `${h.left}%`, animationDelay: `-${h.delay}s`, '--y': `${h.y}%` } as CSSProperties}
        >
          <Heart size={h.size} color={i % 3 === 0 ? '#E84A68' : i % 3 === 1 ? '#F28BA8' : '#FFD6E0'} />
        </span>
      ))}
    </div>
  )
}
