/**
 * YOUR PHOTOGRAPHS
 * ----------------
 * 1. Copy your photo into  public/images/
 * 2. Set `file` to its file name and change `enabled` to true.
 * 3. Adjust `objectPosition` ("50% 20%" keeps more of the top, i.e. faces) if the crop is off.
 *
 * While `enabled` is false (or if the file is missing) a cute CSS illustration is shown instead.
 */
export interface PhotoConfig {
  enabled: boolean
  file: string
  alt: string
  caption: string
  objectPosition: string
  aspectRatio: string
}

/**
 * Set to true to show a heart illustration where a photo would go.
 * Leave false (default) if you are not using photos: the slots are simply hidden.
 */
export const showPlaceholders = false

export const photos: Record<'opening' | 'scrapbook' | 'letter', PhotoConfig> = {
  opening: {
    enabled: false,
    file: 'opening.jpg',
    alt: 'Adun and her boyfriend together',
    caption: 'us 💗',
    objectPosition: '50% 30%',
    aspectRatio: '1 / 1',
  },
  scrapbook: {
    enabled: false,
    file: 'scrapbook.jpg',
    alt: 'A favourite memory of Adun and her boyfriend',
    caption: 'a favourite memory',
    objectPosition: '50% 30%',
    aspectRatio: '4 / 5',
  },
  letter: {
    enabled: false,
    file: 'letter.jpg',
    alt: 'Adun and her boyfriend, a favourite photo',
    caption: 'my favourite picture of us',
    objectPosition: '50% 30%',
    aspectRatio: '4 / 5',
  },
}

/** Base-aware URL so images work under the GitHub Pages sub-path. */
export const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`
