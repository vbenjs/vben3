<script lang="tsx">
import type { DescriptionProps, DescInstance, DescItem } from './typing'
import {
  type CSSProperties,
  type PropType,
  defineComponent,
  computed,
  ref,
  unref,
  toRefs,
  useAttrs,
} from 'vue'
import { getSlot, isFunction, get } from '@vben/utils'

const props = {
  useContainer: { type: Boolean, default: true },
  title: { type: String, default: '' },
  size: {
    type: String,
    validator: (v: string) =>
      ['small', 'medium', 'large', undefined].includes(v),
    default: 'medium',
  },
  bordered: { type: Boolean, default: true },
  column: {
    type: Number,
    default: 3,
  },
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  data: { type: Object },
}

export default defineComponent({
  name: 'Description',
  props,
  emits: ['register'],
  setup(props, { slots, emit }) {
    const propsRef = ref<Partial<DescriptionProps> | null>(null)

    const attrs = useAttrs()

    // Custom title component: get title
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as any),
      }
    })

    const getProps = computed(() => {
      const opt = {
        ...unref(getMergeProps),
        title: undefined,
      }
      return opt as DescriptionProps
    })

    /**
     * @description: Whether to setting title
     */
    const useWrapper = computed(() => !!unref(getMergeProps).title)

    const getDescriptionsProps = computed(() => {
      return { ...unref(attrs), ...unref(getProps) }
    })

    /**
     * @description:设置desc
     */
    function setDescProps(descProps: Partial<DescriptionProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = {
        ...(unref(propsRef) as Record<string, any>),
        ...descProps,
      } as Record<string, any>
    }

    // Prevent line breaks
    function renderLabel({ label, labelMinWidth, labelStyle }: DescItem) {
      if (!labelStyle && !labelMinWidth) {
        return label
      }

      const labelStyles: CSSProperties = {
        ...labelStyle,
        minWidth: `${labelMinWidth}px `,
      }
      return <div style={labelStyles}>{label}</div>
    }

    function renderItem() {
      const { schema, data } = unref(getProps)
      return unref(schema)
        .map((item) => {
          const { render, field, span, show, contentMinWidth } = item

          if (show && isFunction(show) && !show(data)) {
            return null
          }

          const getContent = () => {
            const _data = unref(getProps)?.data
            if (!_data) {
              return null
            }
            const getField = get(_data, field)
            // eslint-disable-next-line
            if (getField && !_data.hasOwnProperty(field)) {
              return isFunction(render) ? render('', _data) : ''
            }
            return isFunction(render) ? render(getField, _data) : getField ?? ''
          }

          const width = contentMinWidth
          return (
            <VbenDescItem label={renderLabel(item)} key={field} span={span}>
              {() => {
                if (!contentMinWidth) {
                  return getContent()
                }
                const style: CSSProperties = {
                  minWidth: `${width}px`,
                }
                return <div style={style}>{getContent()}</div>
              }}
            </VbenDescItem>
          )
        })
        .filter((item) => !!item)
    }

    const renderDesc = () => {
      return (
        <VbenDesc class="description" {...(unref(getDescriptionsProps) as any)}>
          {renderItem()}
        </VbenDesc>
      )
    }

    const renderContainer = () => {
      const content = props.useContainer ? (
        renderDesc()
      ) : (
        <div>{renderDesc()}</div>
      )
      // Reduce the dom level
      if (!props.useContainer) {
        return content
      }

      const { title } = unref(getMergeProps)

      return (
        <vben-card title={title}>
          {{
            default: () => content,
            action: () => getSlot(slots, 'action'),
          }}
        </vben-card>
      )
    }

    const methods: DescInstance = {
      setDescProps,
    }

    emit('register', methods)
    return () => (unref(useWrapper) ? renderContainer() : renderDesc())
  },
})
</script>
