import { letter, stage6 } from '../config/content'
import { photos } from '../config/images'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

/** **bold** markers → <strong>. */
function rich(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

export function FinalLetter({ onRestart }: { onRestart: () => void }) {
  return (
    <article className="letter fade-slow" aria-labelledby="letter-title">
      <p className="letter__orn" aria-hidden="true">♡ &nbsp; ♡ &nbsp; ♡</p>
      <h1 id="letter-title" className="display letter__title">{letter.title}</h1>

      <div className="letter__photo">
        <Photo config={photos.letter} tilt={-2} />
      </div>

      {letter.before.map((p, i) => (
        <p key={i}>{rich(p)}</p>
      ))}

      <section className="joke" aria-label="For all times, always">
        <Reveal>
          <p className="joke__intro">{letter.jokeIntro}</p>
        </Reveal>
        <Reveal className="joke__lines">
          <span className="joke__inf" aria-hidden="true">∞</span>
          <p className="joke__a">{letter.jokeLine1}</p>
          <p className="joke__b">{letter.jokeLine2}</p>
        </Reveal>
      </section>

      {letter.after.map((p, i) => (
        <p key={i} className="letter__after">{rich(p)}</p>
      ))}

      <Reveal className="letter__sign">
        <p className="hand letter__signoff">{letter.signoff}</p>
        <p className="hand letter__name">{letter.name}</p>
      </Reveal>

      <div className="letter__replay">
        <button type="button" className="btn btn--secondary" onClick={onRestart}>{stage6.replay}</button>
      </div>
    </article>
  )
}
