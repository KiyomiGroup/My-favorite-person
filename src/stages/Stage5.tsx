import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { stage5 as t } from '../config/content'
import { HeartBurst } from '../components/HeartBurst'
import { useRoaming } from '../lib/useRoaming'
import { sfx } from '../lib/sound'

export function Stage5({ onNext }: { onNext: () => void }) {
  const [ready, setReady] = useState(false)
  const [dodged, setDodged] = useState(false)
  const [nudge, setNudge] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const dodgedAt = useRef(0)
  const { arenaRef, btnRef, pos, move } = useRoaming(confirmed)

  // Start the bars empty, then fill them once the card is on screen.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(id)
  }, [])

  const dodge = () => {
    if (dodged) return
    setDodged(true)
    dodgedAt.current = Date.now()
    move()
    sfx.pop()
  }

  const confirm = () => {
    if (confirmed) return
    setConfirmed(true)
    sfx.win()
  }

  return (
    <section className="stage" aria-labelledby="s5-title">
      <div className="card card--review">
        <div className="review__head">
          <p className="hand review__file">{t.fileLabel}</p>
          <span className="stamp" aria-hidden="true">{t.stamp}</span>
        </div>
        <h1 id="s5-title" className="display display--small">{t.heading}</h1>
        <p className="lead">{t.intro}</p>

        <ul className="metrics">
          {t.metrics.map((m, i) => (
            <li key={m.label} className={`metric metric--${m.kind ?? 'normal'}`}>
              <div className="metric__top">
                <span className="metric__label">{m.label}</span>
                <strong className="metric__value">{m.value}</strong>
              </div>
              <div className="bar" aria-hidden="true">
                <div className="bar__fill" style={{ width: ready ? `${m.pct}%` : '0%', transitionDelay: `${i * 0.25}s` }} />
              </div>
            </li>
          ))}
        </ul>

        {!confirmed ? (
          <>
            <h2 className="question">{t.question}</h2>
            <div className="yes-row" style={{ '--grow': 1 } as CSSProperties}>
              <button type="button" className="btn btn--primary btn--yes" onClick={confirm}>
                {t.yes}
              </button>
            </div>

            <div className="arena arena--short" ref={arenaRef}>
              <button
                ref={btnRef}
                type="button"
                className="btn btn--ghost btn--no"
                style={{ transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : undefined, visibility: pos ? 'visible' : 'hidden' }}
                onPointerDown={(e) => {
                  if (!dodged) {
                    e.preventDefault()
                    dodge()
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') dodge()
                }}
                onClick={(e) => {
                  if (!dodged) {
                    if (e.detail === 0) dodge() // keyboard
                  } else if (Date.now() - dodgedAt.current > 500) {
                    setNudge((n) => n + 1) // after the one dodge it just stays put
                    sfx.buzz()
                  }
                }}
              >
                {t.lawyer}
              </button>
            </div>

            <div className="sticker-slot" aria-live="polite">
              {dodged && (
                <p key={nudge} className="sticker pop-in">
                  {t.lawyerAdvice}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="success pop-in" aria-live="polite">
            <p className="confirmed__title">{t.confirmedTitle}</p>
            <p className="confirmed__text">{t.confirmedText}</p>
            <button type="button" className="btn btn--primary" onClick={onNext}>
              {t.proceed}
            </button>
          </div>
        )}
      </div>
      {confirmed && <HeartBurst burstKey={1} />}
    </section>
  )
}
