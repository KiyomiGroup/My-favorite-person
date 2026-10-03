import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/** Accessible dialog: focus moves in, Escape/backdrop closes, focus returns on close. */
export function Modal({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: ReactNode }) {
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    btn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal pop-in" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title" className="modal__title">{title}</h2>
        <div className="modal__body">{children}</div>
        <button ref={btn} type="button" className="btn btn--gold" onClick={onClose}>{closeLabel}</button>
      </div>
    </div>
  )
}
