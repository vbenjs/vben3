<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { BASIC_LOGIN_PATH } from '@vben/constants'
import { useRoute } from 'vue-router'
import { useI18n } from '@vben/locale'
import { createNamespace } from '@vben/utils/src/bem'
import notDataSvg from '@/assets/svg/no-data.svg'
import netWorkSvg from '@/assets/svg/net-error.svg'

/**
 * Exception related enumeration
 */
enum ExceptionEnum {
  // page not access
  PAGE_NOT_ACCESS = 403,

  // page not found
  PAGE_NOT_FOUND = 404,

  // error
  ERROR = 500,

  // net work error
  NET_WORK_ERROR = 10000,

  // No data on the page. In fact, it is not an exception page
  PAGE_NOT_DATA = 10100,
}

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: AnyFunction<any>
  status?: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },

    title: {
      type: String as PropType<string>,
      default: '',
    },

    subTitle: {
      type: String as PropType<string>,
      default: '',
    },

    full: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()
    const go = function (_arg?: any) {}
    const redo = function (_arg?: any) {}
    const { t } = useI18n()
    const { bem } = createNamespace('app-exception-page')

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    const backLoginI18n = t('sys.exception.backLogin')
    const backHomeI18n = t('sys.exception.backHome')

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t('sys.exception.subTitle403'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: t('sys.exception.subTitle404'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: t('sys.exception.subTitle500'),
      btnText: backHomeI18n,
      handler: () => go(),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: t('sys.exception.noDataTitle'),
      subTitle: '',
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: notDataSvg,
    })

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: t('sys.exception.networkErrorTitle'),
      subTitle: t('sys.exception.networkErrorSubTitle'),
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: netWorkSvg,
    })

    return () => {
      const { title, subTitle, btnText, icon, handler, status } =
        unref(getMapValue) || {}

      // const img = () => (icon ? <img src={icon} /> : null)

      return (
        <VbenResult
          class={bem() + ' m-4'}
          status={status as any}
          title={props.title || title}
          description={props.subTitle || subTitle}
        >
          {{
            footer: () =>
              btnText && (
                <VbenButton type="primary" onClick={handler}>
                  {() => btnText}
                </VbenButton>
              ),
            icon: () => (icon ? <img src={icon} /> : null),
          }}
        </VbenResult>
      )
    }
  },
})
</script>
<style lang="less">
.app-exception-page {
  display: flex;
  align-items: center;
  flex-direction: column;

  .ant-result-icon {
    img {
      max-width: 400px;
      max-height: 300px;
    }
  }
}
</style>
