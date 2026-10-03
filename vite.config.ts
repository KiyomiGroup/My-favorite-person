import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GITHUB PAGES BASE PATH
 * ----------------------
 * Project site  (https://USER.github.io/boyfriend-day/) -> base "/boyfriend-day/"
 * User site     (https://USER.github.io/)               -> base "/"
 *
 * The GitHub Actions workflow sets VITE_BASE automatically from your repo name,
 * so you normally do NOT need to edit anything. For manual builds, change
 * REPO_NAME below to match your repository.
 */
const REPO_NAME = 'boyfriend-day'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.VITE_BASE ?? `/${REPO_NAME}/` : '/',
  plugins: [react()],
}))
