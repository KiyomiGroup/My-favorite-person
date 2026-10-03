import { useState } from 'react'
import { imageUrl, showPlaceholders } from '../config/images'
import type { PhotoConfig } from '../config/images'
import { Heart } from './Heart'

/**
 * Polaroid-style photo. Shows a CSS illustration until a real photo is
 * enabled in src/config/images.ts, and also if the file fails to load.
 */
export function Photo({ config, tilt = -3 }: { config: PhotoConfig; tilt?: number }) {
  const [failed, setFailed] = useState(false)
  const showImg = config.enabled && !failed
  if (!showImg && !showPlaceholders) return null
  return (
    <figure className="polaroid" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="polaroid__frame" style={{ aspectRatio: config.aspectRatio }}>
        {showImg ? (
          <img
            src={imageUrl(config.file)}
            alt={config.alt}
            style={{ objectPosition: config.objectPosition }}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="polaroid__art" role="img" aria-label="A decorative heart, with room for a photo">
            <Heart size={44} color="#E84A68" />
            <span className="polaroid__art-small">
              <Heart size={18} color="#F28BA8" />
            </span>
          </div>
        )}
      </div>
      <figcaption className="hand">{config.caption}</figcaption>
    </figure>
  )
}
