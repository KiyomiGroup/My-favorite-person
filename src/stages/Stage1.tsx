import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { stage1 as t } from '../config/content'
import { photos } from '../config/images'
import { Photo } from '../components/Photo'
import { HeartBurst } from '../components/HeartBurst'
import { sfx } from '../lib/sound'

interface Pos {
  x: number
  y: number
}

const reactionFor = (attempt: number) =>
  attempt <= 3 ? t.firstNoReactions[attempt - 1] : t.laterNoReactions[(attempt - 4) % t.laterNoReactions.length]

export function Stage1({ onNext }: { onNext: () => void }) {
  const [attempts, setAttempts] = useState(0)
  const [pos, setPos] = useState<Pos | null>(null)
  const [saidYes, setSaidYes] = useState(false)
  const [burstKey, setBurstKey] = useState(0)

  const arenaRef = useRef<HTMLDivElement>(null)
  const noRef = useRef<HTMLButtonElement>(null)
  const lastDodge = useRef(0)

  const bounds = () => {
    const a = arenaRef.current
    const b = noRef.current
    if (!a || !b) return null
    return { maxX: Math.max(0, a.clientWidth - b.offsetWidth), maxY: Math.max(0, a.clientHeight - b.offsetHeight) }
  }

  // Start centred inside the arena; keep inside it when the screen resizes/rotates.
  useLayoutEffect(() => {
    const place = () => {
      const bd = bounds()
      if (!bd) return
      setPos((p) => (p ? { x: Math.min(p.x, bd.maxX), y: Math.min(p.y, bd.maxY) } : { x: bd.maxX / 2, y: bd.maxY / 2 }))
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [saidYes])

  // Pick the farthest of several random spots so the button always visibly "runs away".
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

  const attempt = useCallback(() => {
    setAttempts((n) => n + 1)
    move()
    sfx.pop()
  }, [move])

  // Make sure a pending timer/listener never outlives the stage.
  useEffect(() => {
    return () => {
      lastDodge.current = 0
    }
  }, [])

  const handleYes = () => {
    if (saidYes) return
    setSaidYes(true)
    setBurstKey((k) => k + 1)
    sfx.win()
  }

  const grow = 1 + Math.min(attempts, 8) * 0.05

  return (
    <section className="stage stage1" aria-labelledby="s1-title">
      <div className="card card--paper">
        <span className="doodle doodle--star" aria-hidden="true">✦</span>
        <span className="doodle doodle--sparkle" aria-hidden="true">✧</span>

        <p className="hand annotation">{t.annotation}</p>

        <div className="opening-photo">
          <Photo config={photos.opening} tilt={-4} />
        </div>

        <h1 id="s1-title" className="display">{t.heading}</h1>
        <p className="lead">{t.intro}</p>
        <h2 className="question">{t.question}</h2>

        {!saidYes ? (
          <>
            <div className="sticker-slot" aria-live="polite">
              {attempts > 0 && (
                <p key={attempts} className="sticker pop-in">
                  {reactionFor(attempts)}
                </p>
              )}
            </div>

            <div className="yes-row" style={{ '--grow': grow } as CSSProperties}>
              <button type="button" className="btn btn--primary btn--yes" onClick={handleYes}>
                {t.yes}
              </button>
            </div>

            <div className="arena" ref={arenaRef}>
              <button
                ref={noRef}
                type="button"
                className="btn btn--ghost btn--no"
                style={{ transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : undefined, visibility: pos ? 'visible' : 'hidden' }}
                onPointerDown={(e) => {
                  e.preventDefault()
                  attempt()
                }}
                onClick={(e) => {
                  // detail === 0 means keyboard activation (Enter/Space); touch/mouse is handled on pointerdown.
                  if (e.detail === 0) attempt()
                }}
                onPointerEnter={(e) => {
                  // Desktop: after a couple of tries, dodge the cursor before it even lands.
                  if (e.pointerType === 'mouse' && attempts >= 2 && Date.now() - lastDodge.current > 350) {
                    lastDodge.current = Date.now()
                    move()
                  }
                }}
              >
                {t.no}
              </button>
            </div>
          </>
        ) : (
          <div className="success pop-in" aria-live="polite">
            <p className="sticker sticker--big">{t.successMessage}</p>
            <button type="button" className="btn btn--primary" onClick={onNext}>
              {t.proceed}
            </button>
          </div>
        )}

        <p className="hand inside-joke">{t.insideJoke}</p>
      </div>

      {burstKey > 0 && <HeartBurst key={burstKey} burstKey={burstKey} />}
    </section>
  )
}
