import { useState } from 'react'
import { stage4 as t } from '../config/content'
import { photos } from '../config/images'
import { AnswerOption } from '../components/AnswerOption'
import { HeartBurst } from '../components/HeartBurst'
import { Photo } from '../components/Photo'
import { sfx } from '../lib/sound'

export function Stage4({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0)
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [lastWrong, setLastWrong] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const [solved, setSolved] = useState(false)

  const q = t.questions[index]
  const isLast = index === t.questions.length - 1
  const wrong = q.options.find((o) => o.id === lastWrong)

  const pick = (id: string) => {
    if (solved) return
    const opt = q.options.find((o) => o.id === id)!
    if (opt.correct) {
      setSolved(true)
      setLastWrong(null)
      sfx.win()
    } else {
      setWrongIds((w) => (w.includes(id) ? w : [...w, id]))
      setLastWrong(id)
      setShake((n) => n + 1)
      sfx.buzz()
    }
  }

  const goNext = () => {
    if (!solved) return
    setIndex((i) => i + 1)
    setSolved(false)
    setWrongIds([])
    setLastWrong(null)
  }

  return (
    <section className="stage" aria-labelledby="s4-title">
      <div className="card card--scrap">
        <span className="tape tape--l" aria-hidden="true" />
        <div className="scrap-head">
          <div>
            <h1 id="s4-title" className="display display--small">{t.heading}</h1>
            <p className="lead">{t.intro}</p>
          </div>
          <div className="scrap-photo">
            <Photo config={photos.scrapbook} tilt={4} />
          </div>
        </div>

        <div className="qprogress" aria-label={`Question ${index + 1} of ${t.questions.length}`}>
          <span className="qprogress__text">Question {index + 1} of {t.questions.length}</span>
          <span className="qprogress__dots" aria-hidden="true">
            {t.questions.map((_, i) => (
              <span key={i} className={i < index || (i === index && solved) ? 'done' : i === index ? 'current' : ''} />
            ))}
          </span>
        </div>

        <div key={`${q.id}-${shake}`} className={`qcard${lastWrong ? ' shake' : ''}`}>
          <p className="hand qnote">{q.note}</p>
          <h2 className="question question--scrap">{q.question}</h2>
          <div className="answers">
            {q.options.map((o) => (
              <AnswerOption
                key={o.id}
                letter={o.id}
                text={o.text}
                state={solved && o.correct ? 'correct' : wrongIds.includes(o.id) ? 'wrong' : 'idle'}
                disabled={solved}
                onSelect={() => pick(o.id)}
              />
            ))}
          </div>
        </div>

        <div className="feedback-slot" aria-live="polite">
          {wrong && (
            <p className="feedback feedback--wrong pop-in">
              <strong>✕ {t.wrongLabel}</strong> {wrong.feedback}
            </p>
          )}
          {solved && (
            <div className="pop-in">
              <p className="feedback feedback--right">
                <span className="star-pop" aria-hidden="true">⭐</span> {q.correctMessage}
              </p>
              {isLast && <p className="sticker sticker--note">{t.finalMessage}</p>}
              <button type="button" className="btn btn--primary" onClick={isLast ? onNext : goNext}>
                {isLast ? t.proceed : t.next}
              </button>
            </div>
          )}
        </div>
      </div>
      {solved && <HeartBurst key={q.id} burstKey={index + 1} />}
    </section>
  )
}
