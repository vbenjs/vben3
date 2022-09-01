import { ref, unref } from 'vue'
import { VbenFormProps } from '../type'
import { error } from '../../../index'

export interface formMethod {
  // reload: () => void
  setProps: (props: VbenFormProps) => void
}

export function useForm(props: VbenFormProps) {
  const formRef = ref<Nullable<formMethod>>(null)

  function register(instance) {
    formRef.value = instance
    instance.setProps(props)
  }
  function getInstance(): formMethod {
    const form = unref(formRef)
    if (!form) {
      error('表单实例不存在')
    }
    return form as formMethod
  }
  const methods: formMethod = {
    // reload: () => getInstance().reload,
    setProps: () => getInstance().setProps,
  }
  return [register, methods]
}
