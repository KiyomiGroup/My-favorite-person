import { useEffect, useRef, useState } from 'react'
import { stage6 as t } from '../config/content'
import { AnswerOption } from '../components/AnswerOption'
import { FinalLetter } from '../components/FinalLetter'
import { sfx } from '../lib/sound'

export type Finale = 'quiz' | 'unlocked' | 'letter'

export function Stage6({ finale, setFinale, onRestart }: { finale: Finale; setFinale: (f: Finale) => void; onRestart: () => void }) {
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [lastWrong, setLastWrong] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const [opening, setOpening] = useState(false)
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])
  useEffect(() => window.scrollTo({ top: 0 }), [finale])

  const pick = (id: string) => {
    const opt = t.options.find((o) => o.id === id)!
    if (opt.correct) {
      sfx.envelope()
      setFinale('unlocked')
    } else {
      setWrongIds((w) => (w.includes(id) ? w : [...w, id]))
      setLastWrong(id)
      setShake((n) => n + 1)
      sfx.buzz()
    }
  }

  const openLetter = () => {
    if (opening) return
    setOpening(true)
    sfx.envelope()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = window.setTimeout(() => setFinale('letter'), reduce ? 100 : 1100)
  }

  if (finale === 'letter') {
    return (
      <section className="stage">
        <FinalLetter onRestart={onRestart} />
      </section>
    )
  }

  if (finale === 'unlocked') {
    return (
      <section className="stage" aria-labelledby="s6-envelope">
        <div className="card card--paper envelope-card fade-slow">
          <div className={`envelope${opening ? ' envelope--open' : ''}`} role="img" aria-label="A sealed envelope">
            <div className="envelope__back" />
            <div className="envelope__paper" />
            <div className="envelope__front" />
            <div className="envelope__flap" />
            <div className="envelope__seal"><span aria-hidden="true">❤</span></div>
          </div>
          <h1 id="s6-envelope" className="display display--small envelope-card__line">{t.envelopeLine}</h1>
          <button type="button" className="btn btn--primary" onClick={openLetter} disabled={opening}>
            {t.openLetter}
          </button>
        </div>
      </section>
    )
  }

  const wrong = t.options.find((o) => o.id === lastWrong)
  return (
    <section className="stage" aria-labelledby="s6-title">
      <div key={shake} className={`card card--show${lastWrong ? ' shake' : ''}`}>
        <p className="hand hand--gold">{t.annotation}</p>
        <h1 id="s6-title" className="display display--gold">{t.heading}</h1>
        <p className="lead">{t.intro}</p>
        <h2 className="question question--show">{t.question}</h2>
        <div className="answers">
          {t.options.map((o) => (
            <AnswerOption key={o.id} letter={o.id} text={o.text} state={wrongIds.includes(o.id) ? 'wrong' : 'idle'} onSelect={() => pick(o.id)} />
          ))}
        </div>
        <div className="feedback-slot" aria-live="polite">
          {wrong && (
            <p className="feedback feedback--wrong pop-in">
              <strong>✕ {t.wrongLabel}</strong> {wrong.feedback}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
