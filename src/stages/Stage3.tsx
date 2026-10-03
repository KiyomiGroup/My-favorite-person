import { useCallback, useState } from 'react'
import { stage3 as t } from '../config/content'
import { AnswerOption } from '../components/AnswerOption'
import { Modal } from '../components/Modal'
import { HeartBurst } from '../components/HeartBurst'
import { sfx } from '../lib/sound'

type Life = 'ask' | 'fifty' | 'call'

export function Stage3({ onNext }: { onNext: () => void }) {
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [removed, setRemoved] = useState<string[]>([])
  const [used, setUsed] = useState<Life[]>([])
  const [modal, setModal] = useState<'ask' | 'call' | null>(null)
  const [lastWrong, setLastWrong] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const [solved, setSolved] = useState(false)

  const closeModal = useCallback(() => setModal(null), [])

  const pick = (id: string) => {
    if (solved) return
    const opt = t.options.find((o) => o.id === id)!
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

  const useLife = (life: Life) => {
    if (solved || used.includes(life)) return
    setUsed((u) => [...u, life])
    sfx.pop()
    if (life === 'fifty') {
      const wrong = t.options.filter((o) => !o.correct).map((o) => o.id)
      const keep = wrong[Math.floor(Math.random() * wrong.length)] // one wrong option stays beside the correct one
      setRemoved(wrong.filter((id) => id !== keep))
      setLastWrong(null)
    } else {
      setModal(life)
    }
  }

  const wrong = t.options.find((o) => o.id === lastWrong)

  return (
    <section className="stage" aria-labelledby="s3-title">
      <div key={shake} className={`card card--show${lastWrong ? ' shake' : ''}`}>
        <h1 id="s3-title" className="display display--gold">{t.heading}</h1>
        <p className="lead">{t.intro}</p>

        <div className="lifelines" role="group" aria-label="Lifelines">
          {t.lifelines.map((l) => {
            const isUsed = used.includes(l.id)
            return (
              <button
                key={l.id}
                type="button"
                className={`lifeline${isUsed ? ' lifeline--used' : ''}`}
                disabled={isUsed || solved}
                onClick={() => useLife(l.id)}
              >
                <span aria-hidden="true">{l.icon}</span>
                <span>{l.label}</span>
                {isUsed && <span className="sr-only"> (used)</span>}
              </button>
            )
          })}
        </div>

        <h2 className="question question--show">{t.question}</h2>

        <div className="answers">
          {t.options
            .filter((o) => !removed.includes(o.id))
            .map((o) => (
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

        <div className="feedback-slot" aria-live="polite">
          {wrong && (
            <p className="feedback feedback--wrong pop-in">
              <strong>✕ {t.wrongLabel}</strong> {wrong.feedback}
            </p>
          )}
          {solved && (
            <div className="win pop-in">
              <p className="win__title">{t.winTitle}</p>
              <p className="win__text">{t.winText}</p>
              <button type="button" className="btn btn--gold" onClick={onNext}>{t.proceed}</button>
            </div>
          )}
        </div>
      </div>

      {modal && (
        <Modal title={t.modals[modal].title} onClose={closeModal} closeLabel={t.closeLabel}>
          {t.modals[modal].lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </Modal>
      )}
      {solved && <HeartBurst burstKey={1} />}
    </section>
  )
}
