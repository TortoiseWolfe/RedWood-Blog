import { dirname, join } from 'node:path'
import type { StorybookConfig } from 'storybook-framework-redwoodjs-vite'

import { getPaths, importStatementPath } from '@redwoodjs/project-config'

const redwoodProjectPaths = getPaths()

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  framework: getAbsolutePath('storybook-framework-redwoodjs-vite'),

  stories: [
    `${importStatementPath(
      redwoodProjectPaths.web.src
    )}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ],

  addons: [],
}

export default config
