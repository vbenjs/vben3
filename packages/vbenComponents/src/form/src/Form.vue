<script lang="ts" setup name="VbenForm">
import { maps } from '#/index'
import { computed, onMounted, ref, unref, useAttrs, watch } from 'vue'
import { GridItemProps, VbenFormProps } from './type'
import { set } from '@vben/utils'
const emit = defineEmits(['register', 'update:model'])
const innerProps = ref<Partial<VbenFormProps>>()
const Form = maps.get('Form')
const formRef = ref(null)
const props = defineProps({
  schemas: [],
  rules: {
    type: Object || Array,
    default: {},
  },
})
const attrs = useAttrs()
const getRules = computed(() => innerProps.value?.rules || props.rules)
const setProps = (prop: Partial<VbenFormProps>) => {
  prop.schemas?.forEach((v) => {
    if (v.defaultValue) {
      fieldValue.value[v.field] = v.defaultValue
    }
    if (v.required || !v.rule) {
      v.rule = {
        required: true,
      }
    }
  })

  innerProps.value = {
    actions: false,
    ...prop,
    ...unref(innerProps),
  }
}
const fieldValue = ref(attrs.model)
watch(
  () => attrs.model,
  () => {
    const m = JSON.parse(JSON.stringify(attrs.model))
    sObject(m)
  },
  { deep: true, immediate: true },
)
watch(
  () => fieldValue,
  () => {
    emit('update:model', getFieldValue())
  },
  { deep: true },
)
function sObject(m, key?) {
  Object.keys(m).forEach((k) => {
    const tempKey = key ? key + '.' + k : k
    if (typeof m[k] == 'object') {
      sObject(m[k], tempKey)
      return
    }
    // fieldValue.value[tempKey] = m[k]
  })
}
function getFieldValue() {
  const m = JSON.parse(JSON.stringify(fieldValue.value))
  Object.keys(m).forEach((k) => {
    if (k.indexOf('.') != -1) {
      const v = m[k]
      delete m[k]
      set(m, k, v)
    }
  })
  return m
}
// 默认gridItem参数
const getGridItemProps = (p) => {
  return { span: getGridProps.value.span, ...p }
}

const getFormItemProps = (p) => {
  const { labelProps } = p

  return { ...labelProps }
}

// 默认grid参数
const getGridProps = computed(() => {
  return {
    cols: 24,
    span: 8,
    xGap: 12,
    yGap: 0,
    ...innerProps.value?.gridProps,
  }
})

const FormMethod = ref({})

onMounted(() => {
  FormMethod.value = {
    setProps,
    getFieldValue,
    validate: formRef.value?.validate,
    restoreValidation: formRef.value?.restoreValidation,
    updateSchemas: (schemas) => {
      innerProps.value.schemas = schemas
    },
  }
  emit('register', unref(FormMethod))
})
</script>
<template>
  <div>
    <!--    {{ $attrs }}-->
    <Form ref="formRef" v-bind="$attrs" :rules="getRules">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <VbenGrid v-bind="getGridProps">
        <VbenGridItem
          v-bind="getGridItemProps(schema.gridItemProps)"
          v-for="(schema, key) in innerProps?.schemas"
          :key="key"
          :path="schema.field"
        >
          <VbenFormItem
            :label="schema.label"
            :path="schema.field"
            :showRequireMark="schema.required"
            :rule="schema.rule"
            v-bind="getFormItemProps(schema)"
          >
            <slot
              :name="schema.slot"
              v-if="schema.slot"
              v-bind="{ m: fieldValue, field: schema.field }"
            ></slot>
            <component
              v-if="
                (schema.component !== 'InputPassword' ||
                  schema.component !== 'InputTextArea') &&
                !schema.slot
              "
              :is="`Vben${schema.component}`"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="password"
              v-if="schema.component === 'InputPassword'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="textarea"
              v-if="schema.component === 'InputTextArea'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
          </VbenFormItem>
        </VbenGridItem>
        <VbenGridItem
          v-if="innerProps?.schemas.length > 0 && innerProps.actions"
          v-bind="innerProps.actionsProps"
        >
          <slot name="actions-prefix" v-bind="FormMethod || {}"></slot>
          <slot name="actions" v-bind="FormMethod || {}">
            <VbenButtonGroup
              ><VbenButton type="error" @click="formRef.restoreValidation">{{
                innerProps.actionsProps.cancelText || '重置'
              }}</VbenButton>
              <VbenButton
                type="primary"
                @click="innerProps.submitFunc(FormMethod)"
                >{{ innerProps.actionsProps.submitText || '提交' }}</VbenButton
              ></VbenButtonGroup
            >
          </slot>
          <slot name="actions-suffix" v-bind="FormMethod || {}"></slot>
        </VbenGridItem>
      </VbenGrid>
    </Form>
  </div>
</template>

<style scoped></style>
