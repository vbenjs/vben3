import { defineStore } from 'pinia'
import { FooterLinkOptions, DefineSiteGeneralOptions } from '@vben/types'
import { i18n } from '@vben/locale'
// @ts-ignore
import defaultLogo from '@/assets/images/logo.png'
// @ts-ignore
import defaultAvatar from '@/assets/images/header.jpg'
import { getGlobalConfig } from '@vben/utils'

// @ts-ignore
const { title } = getGlobalConfig(import.meta.env)

// github repo url
export const GITHUB_URL = 'https://github.com/vbenjs/vben3'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://vbenjs.github.io/vben3-doc/'

// site url
export const SITE_URL = 'https://vben.mufei88.com/'

export const useSiteGeneral = defineStore({
  id: 'APP_SITE_GENERAL_OPTIONS',
  state: (): DefineSiteGeneralOptions => ({
    logo: defaultLogo,
    title,
    copyright: '2023 Vben Admin',
    links: [
      {
        label: i18n.global.t('layout.footer.onlinePreview'),
        url: SITE_URL,
      },
      {
        icon: 'uim:github',
        url: GITHUB_URL,
      },
      {
        label: i18n.global.t('layout.footer.onlineDocument'),
        url: DOC_URL,
      },
    ] as FooterLinkOptions[],
    avatar: defaultAvatar,
    username: 'Vben Admin',
  }),
})
