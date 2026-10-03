import { Component } from 'react'
import type { ReactNode } from 'react'

/** If anything crashes, show a readable message (instead of a blank screen) with a way to restart. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ maxWidth: 480, margin: '40px auto', padding: 20, fontFamily: 'system-ui, sans-serif', color: '#35232A' }}>
        <h1 style={{ color: '#76283F' }}>Oops, something went wrong 💔</h1>
        <p>Please send this message to Adun:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#FFF9F0', border: '2px solid #FFD6E0', borderRadius: 16, padding: 14, fontSize: 13 }}>
          {String(this.state.error.stack ?? this.state.error.message ?? this.state.error).slice(0, 700)}
        </pre>
        <button type="button" onClick={() => window.location.reload()} style={{ minHeight: 48, padding: '10px 22px', borderRadius: 999, border: 'none', background: '#F28BA8', color: '#76283F', fontWeight: 700, fontSize: 16 }}>
          Reload
        </button>
      </div>
    )
  }
}
