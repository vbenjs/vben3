import type { UserConfig } from 'vite'

export async function createAntdPreset(): Promise<UserConfig> {
  const primaryColor = '#0960bd'
  return {
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'dayjs',
        'dayjs/locale/eu',
        'dayjs/locale/zh-cn',
        // 'lodash-es',
      ],
      exclude: ['vue-demi'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            antdv: ['ant-design-vue', '@ant-design/icons-vue'],
            dayjs: ['dayjs'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': primaryColor,
            'border-color-base': 'hsv(0, 0, 85%)',
            'font-size-base': '14px',
            'border-radius-base': '2px',
            'text-color': 'rgba(0,0,0,0.85)',
            'modal-mask-bg': 'rgba(0,0,0,0.45)',
            'layout-body-background': '#f0f2f5',
            'background-color-light': 'hsv(0, 0, 98%)',
            'text-color-secondary': 'rgba(0,0,0,0.45)',
            'component-background': '#fff',
            'info-color': primaryColor,
            'processing-color': primaryColor,
            'success-color': '#55D187', //  Success color
            'error-color': '#ED6F6F', //  False color
            'warning-color': '#EFBD47', //   Warning color
            'link-color': primaryColor, //   Link color
            'app-content-background': '#fafafa', //   Link color

            'item-hover-bg': '#f5f5f5',
          },
          // modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  }
}
