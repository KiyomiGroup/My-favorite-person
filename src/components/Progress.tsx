import { Heart } from './Heart'
import { TOTAL_STAGES } from '../config/content'

export function Progress({ stage }: { stage: number }) {
  const pct = (stage / TOTAL_STAGES) * 100
  return (
    <header className="progress" aria-label={`Boyfriend Level: ${stage} of ${TOTAL_STAGES}`}>
      <p className="progress__label">
        Boyfriend Level: {stage}/{TOTAL_STAGES}
      </p>
      <div className="progress__hearts" aria-hidden="true">
        {Array.from({ length: TOTAL_STAGES }, (_, i) => (
          <span key={i} className={i < stage ? 'on' : ''}>
            <Heart size={18} />
          </span>
        ))}
      </div>
      <div className="progress__bar" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL_STAGES} aria-valuenow={stage}>
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </header>
  )
}
