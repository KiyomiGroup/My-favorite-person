import { useEffect, useReducer } from 'react'
import { FloatingHearts } from './components/FloatingHearts'
import { Progress } from './components/Progress'
import { SoundToggle } from './components/SoundToggle'
import { Stage1 } from './stages/Stage1'
import { Stage6 } from './stages/Stage6'
import type { Finale } from './stages/Stage6'
import { Stage5 } from './stages/Stage5'
import { Stage4 } from './stages/Stage4'
import { Stage3 } from './stages/Stage3'
import { Stage2 } from './stages/Stage2'
import { TOTAL_STAGES } from './config/content'
import { setMuted } from './lib/sound'

/**
 * Central game state. Later stages add their own fields here
 * (quiz question, lifelines used, letter open, etc).
 */
interface State {
  stage: number
  muted: boolean
  /** Stage 6 progress: reward quiz → sealed envelope → letter. */
  finale: Finale
}

type Action = { type: 'advance'; from: number } | { type: 'restart' } | { type: 'toggleMute' } | { type: 'finale'; value: Finale }

const initial: State = { stage: 1, muted: false, finale: 'quiz' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'advance':
      // `from` guards against double-clicks skipping a stage.
      return action.from === state.stage && state.stage < TOTAL_STAGES ? { ...state, stage: state.stage + 1 } : state
    case 'restart':
      return { ...initial, muted: state.muted }
    case 'toggleMute':
      return { ...state, muted: !state.muted }
    case 'finale':
      // Only reachable from stage 6; the letter can't be skipped to.
      return state.stage === 6 ? { ...state, finale: action.value } : state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    setMuted(state.muted)
  }, [state.muted])
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [state.stage])
  // Stage 3 is a dark game-show set; theme the whole page (incl. overscroll area).
  const finaleDark = state.stage === 6 && state.finale === 'quiz'
  useEffect(() => {
    document.body.classList.toggle('theme-show', state.stage === 3)
    document.body.classList.toggle('theme-finale', finaleDark)
  }, [state.stage, finaleDark])

  const next = () => dispatch({ type: 'advance', from: state.stage })

  return (
    <div className={`app${state.stage === 3 || finaleDark ? ' app--show' : ''}${finaleDark ? ' app--finale' : ''}`}>
      <FloatingHearts slow={state.stage === 6 && state.finale !== 'quiz'} />
      <SoundToggle muted={state.muted} onToggle={() => dispatch({ type: 'toggleMute' })} />
      <Progress stage={state.stage} />
      <main className="main" key={state.stage}>
        {state.stage === 1 ? (
          <Stage1 onNext={next} />
        ) : state.stage === 2 ? (
          <Stage2 onNext={next} />
        ) : state.stage === 3 ? (
          <Stage3 onNext={next} />
        ) : state.stage === 4 ? (
          <Stage4 onNext={next} />
        ) : state.stage === 5 ? (
          <Stage5 onNext={next} />
        ) : (
          <Stage6
            finale={state.finale}
            setFinale={(value) => dispatch({ type: 'finale', value })}
            onRestart={() => dispatch({ type: 'restart' })}
          />
        )}
      </main>
    </div>
  )
}
