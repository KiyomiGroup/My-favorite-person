export type OptionState = 'idle' | 'wrong' | 'correct'

/** Reusable quiz answer. State is shown with an icon + text style, never colour alone. */
export function AnswerOption({
  letter,
  text,
  state = 'idle',
  disabled = false,
  onSelect,
}: {
  letter: string
  text: string
  state?: OptionState
  disabled?: boolean
  onSelect: () => void
}) {
  return (
    <button type="button" className={`answer answer--${state}`} onClick={onSelect} disabled={disabled}>
      <span className="answer__letter" aria-hidden="true">
        {state === 'correct' ? '✓' : state === 'wrong' ? '✕' : letter}
      </span>
      <span className="answer__text">{text}</span>
      {state === 'wrong' && <span className="sr-only"> (incorrect)</span>}
      {state === 'correct' && <span className="sr-only"> (correct)</span>}
    </button>
  )
}
