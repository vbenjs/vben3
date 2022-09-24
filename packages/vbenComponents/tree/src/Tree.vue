<script lang="ts" setup name="VbenTree">
import { maps } from '../../index'
import { fetchProps, fetch } from '../../fetch'
import { computed, h, ref, watch, watchEffect } from 'vue'
import { NodeButtonGroup } from '../index'
const Tree = maps.get('Tree')
const props = defineProps({
  split: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: undefined,
  },
  pattern: {
    type: String,
    default: '',
  },
  //Add事件
  onAdd: {
    type: Function,
    default: undefined,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  //edit事件
  onEdit: {
    type: Function,
    default: undefined,
  },
  //delete事件
  onDelete: {
    type: Function,
    default: undefined,
  },
  dropdownOption: {
    type: [Boolean, Array],
    default: undefined,
  },

  ...fetchProps,
})
const data = ref([])
const isFirstLoad = ref(true)
watchEffect(() => {
  props.immediate && fetch(props, data)
})
watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch(props, data)
  },
  { deep: true },
)
const input = ref('')
const option = computed(() => {
  // console.log(props.data || data.value)
  const o = props.data || data.value
  o.map((v) => {
    if (!props.edit) return v
    if (v.edit == false) return v
    if (!v.suffix) {
      v.suffix = () =>
        h(
          NodeButtonGroup,
          {
            onDelete: () => props.onDelete && props.onDelete(v.key),
            onEdit: () => props.onEdit && props.onEdit(v.key),
            key: v.key,
          },
          {
            default: () => '是否删除' + v.label + '???',
          },
        )
    }
  })
})
</script>
<template>
  <Tree v-bind="$attrs" :options="option">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Tree>
</template>

<style scoped></style>
