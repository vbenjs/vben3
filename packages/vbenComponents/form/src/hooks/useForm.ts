import { ref, unref } from 'vue'
import { VbenFormProps } from '../type'
import { error } from '../../../index'

export interface formMethod {
  // reload: () => void
  // setProps: (props: VbenTableProps) => void
}

export function useForm(props: VbenFormProps) {
  const tableRef = ref<Nullable<formMethod>>(null)

  function register(instance) {
    tableRef.value = instance
    props && instance.setProps(props)
  }
  function getInstance(): formMethod {
    const table = unref(tableRef)
    if (!table) {
      error('表格实例不存在')
    }
    return table as formMethod
  }
  const methods: formMethod = {
    // reload: () => getInstance().reload,
    // setProps: () => getInstance().setProps,
  }
  return [register, methods]
}
