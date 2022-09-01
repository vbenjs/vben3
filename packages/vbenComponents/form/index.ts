import { withInstall } from '../index'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'
import FormItemGi from './src/FormItemGi.vue'
FormItemGi.__GRID_ITEM__ = true

export * from './src/type'
export { useForm } from './src/hooks/useForm'
export const VbenForm = withInstall(Form)
export const VbenFormItem = withInstall(FormItem)
export const VbenFormItemGi = withInstall(FormItemGi)
