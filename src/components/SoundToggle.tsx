export function SoundToggle({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Turn sound on' : 'Mute sound'}
    >
      <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
    </button>
  )
}
