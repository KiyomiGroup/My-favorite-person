import { useState } from 'react'
import { stage2 as t } from '../config/content'
import { AnswerOption } from '../components/AnswerOption'
import { LoveMeter } from '../components/LoveMeter'
import { HeartBurst } from '../components/HeartBurst'
import { sfx } from '../lib/sound'

export function Stage2({ onNext }: { onNext: () => void }) {
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const [solved, setSolved] = useState(false)

  const pick = (id: string) => {
    if (solved) return
    const opt = t.options.find((o) => o.id === id)!
    if (opt.correct) {
      setSolved(true)
      setWrongId(null)
      sfx.win()
    } else {
      setWrongId(id)
      setShake((n) => n + 1)
      sfx.buzz()
    }
  }

  const wrong = t.options.find((o) => o.id === wrongId)

  return (
    <section className="stage" aria-labelledby="s2-title">
      <div key={shake} className={`card card--quiz${wrong ? ' shake' : ''}`}>
        <span className="doodle doodle--star" aria-hidden="true">♡</span>
        <h1 id="s2-title" className="display">{t.heading}</h1>
        <p className="lead">{t.intro}</p>

        <LoveMeter infinite={solved} />

        <h2 className="question">{t.question}</h2>

        <div className="answers">
          {t.options.map((o) => (
            <AnswerOption
              key={o.id}
              letter={o.id}
              text={o.text}
              state={solved && o.correct ? 'correct' : wrongId === o.id ? 'wrong' : 'idle'}
              disabled={solved}
              onSelect={() => pick(o.id)}
            />
          ))}
        </div>

        <div className="feedback-slot" aria-live="polite">
          {wrong && (
            <p className="feedback feedback--wrong pop-in">
              <strong>✕ {t.wrongLabel}</strong> {wrong.feedback}
            </p>
          )}
          {solved && (
            <div className="pop-in">
              <p className="feedback feedback--right">{t.successMessage}</p>
              <button type="button" className="btn btn--primary" onClick={onNext}>
                {t.proceed}
              </button>
            </div>
          )}
        </div>
      </div>
      {solved && <HeartBurst burstKey={1} />}
    </section>
  )
}
