import { ref, unref } from 'vue'
import { VbenTableProps } from '../type'
import { error } from '../../../index'
import { VxeTableDefines } from 'vxe-table'

export interface tableMethod {
  reload: () => void
  setProps: (props: VbenTableProps) => void
}

export function useTable(props: {
  border: boolean
  pagination: boolean
  columns: VxeTableDefines.ColumnOptions[]
  stripe: boolean
  api: () => Promise<any>
  title: string
  params: { a: string; i: string }
  align: string
}) {
  const tableRef = ref<Nullable<tableMethod>>(null)

  function register(instance) {
    tableRef.value = instance
    props && instance.setProps(props)
  }
  function getInstance(): tableMethod {
    const table = unref(tableRef)
    if (!table) {
      error('表格实例不存在')
    }
    return table as tableMethod
  }
  const methods: tableMethod = {
    reload: () => getInstance().reload,
    setProps: () => getInstance().setProps,
  }
  return [register, methods]
}
