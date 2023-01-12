import type { StaticConfig, DynamicConfig } from '@vben/types'

// github repo url
export const GITHUB_URL = 'https://github.com/vbenjs/vben3'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://vbenjs.github.io/vben3-doc/'

// site url
export const SITE_URL = 'http://vben.mufei88.com/'

const dynamicConfig: DynamicConfig = {
  __: '',
}

// ! You need to clear the browser cache after the change
const staticConfig: StaticConfig = {
  authType: 'frontend',

  // enable
  enableProgress: true,
}

export const config = { ...staticConfig, ...dynamicConfig }

export const siteSetting = {GITHUB_URL, DOC_URL, SITE_URL}
