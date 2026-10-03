import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Fades children in once, when scrolled into view. Always visible if IntersectionObserver is missing. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return (
    <div ref={ref} className={`reveal${seen ? ' reveal--in' : ''} ${className}`}>
      {children}
    </div>
  )
}
