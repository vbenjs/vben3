/**
 * The instant on-demand atomic CSS engine.
 * @see https://github.com/unocss/unocss
 */

import Unocss from 'unocss/vite'
import { presetIcons, presetMini } from 'unocss'
export function configUnocssPlugin() {
  return Unocss({
    content: { pipeline: { exclude: ['node_modules', '.git', 'dist'] } },
    presets: [presetIcons(), presetMini({ dark: 'class' })],
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
      'grid-center': 'grid place-content-center',
    },
    theme: {
      colors: {
        primary: 'var(--primary-color)',
      },
      backgroundColor: {},
      transitionProperty: [],
    },
  })
}
