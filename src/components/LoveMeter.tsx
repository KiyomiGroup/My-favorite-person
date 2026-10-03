/** Fills slowly to a teasing level; when `infinite` it runs full and shows ∞. */
export function LoveMeter({ infinite }: { infinite: boolean }) {
  return (
    <div className={`meter${infinite ? ' meter--infinite' : ''}`} role="img" aria-label={infinite ? 'Love meter: infinite' : 'Love meter: measuring'}>
      <div className="meter__track">
        <div className="meter__fill" />
      </div>
      <span className="meter__value" aria-hidden="true">{infinite ? '♾️' : '❤️ ?'}</span>
    </div>
  )
}
