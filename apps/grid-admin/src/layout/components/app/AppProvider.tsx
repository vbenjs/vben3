import {
  createMediaPrefersColorSchemeListen,
  createBreakpointListen,
} from '@vben/hooks'
import { namespace } from '@/setting'
import { defineComponent, toRefs, ref } from 'vue'
import { createAppProviderContext } from '@vben/hooks'
import { useMsg, useNotice } from '@vben/vbencomponents'
import { setMsg, setNoice } from '@vben/request'

const props = {
  /**
   * class style prefix
   */
  prefixCls: { type: String, default: namespace },
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false)
    //注册msg以及notice，方便全局使用
    const msg = useMsg()
    const notice = useNotice()
    setMsg(msg)
    setNoice(notice)
    // Monitor screen breakpoint information changes
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
    })
    // Listen for system theme changes
    createMediaPrefersColorSchemeListen()

    const { prefixCls } = toRefs(props)

    // Inject variables into the global
    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  },
})
