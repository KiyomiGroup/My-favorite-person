/**
 * Tiny generated sound effects (no audio files needed).
 * Nothing plays until the user has interacted, and nothing plays while muted.
 */
let ctx: AudioContext | null = null
let muted = false
let busyUntil = 0

export const setMuted = (m: boolean) => {
  muted = m
}

function getCtx(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx ??= new Ctor()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function play(notes: [number, number][], type: OscillatorType, vol = 0.06) {
  if (muted) return
  const c = getCtx()
  if (!c) return
  const now = c.currentTime
  if (now < busyUntil) return // avoid overlapping sounds
  let t = now
  for (const [freq, dur] of notes) {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(gain).connect(c.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
    t += dur * 0.9
  }
  busyUntil = t
}

export const sfx = {
  pop: () => play([[660, 0.07], [880, 0.08]], 'sine'),
  buzz: () => play([[160, 0.18], [130, 0.22]], 'sawtooth', 0.04),
  win: () => play([[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.22]], 'triangle'),
  envelope: () => play([[392, 0.25], [523, 0.35]], 'sine'),
}
