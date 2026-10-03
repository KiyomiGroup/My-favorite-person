export function Heart({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 27S4 19.6 4 11.6C4 7.9 6.8 5.5 9.9 5.5c2.4 0 4.6 1.3 6.1 3.5 1.5-2.2 3.7-3.5 6.1-3.5 3.1 0 5.9 2.4 5.9 6.1C28 19.6 16 27 16 27z"
        fill={color}
      />
    </svg>
  )
}
