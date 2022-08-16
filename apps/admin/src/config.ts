import type { StaticConfig, DynamicConfig } from '@vben/types'

// github repo url
export const GITHUB_URL = 'https://github.com/anncwb/vue-vben-admin'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://vvbin.cn/doc-next/'

// site url
export const SITE_URL = 'https://vvbin.cn/next/'

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
