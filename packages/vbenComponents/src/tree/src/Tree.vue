<script lang="ts" setup name="VbenTree">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
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
  // 编辑模式开关
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
            onDelete: () => props.onDelete && props.onDelete(v),
            onEdit: () => props.onEdit && props.onEdit(v),
            key: v.key,
          },
          {
            default: () => '是否删除' + v.label + '???',
          },
        )
    }
    return v
  })
  return o
})

const handleSelect = (key, o) => {
  o.action && o.action()
  // switch (key) {
  //   case 'add':
  //     props.onAdd && props.onAdd()
  //     return
  // }
}
const emit = defineEmits(['update:pattern'])
</script>
<template>
  <div>
    <VbenSpace
      justify="space-between"
      align="center"
      class="m-1 p-1 b-b"
      v-if="title || $slots.extra || $slots.title"
    >
      <slot name="title"
        ><VbenText type="primary"> {{ title }} </VbenText>
      </slot>
      <slot name="extra"
        ><VbenInputGroup
          ><VbenInput
            size="tiny"
            :value="pattern"
            @update:value="emit('update:pattern', pattern)"
          >
          </VbenInput>
          <VbenButton size="tiny">搜索</VbenButton>
          <VbenDropdown
            v-if="dropdownOption"
            size="small"
            :options="dropdownOption"
            @select="handleSelect"
          >
            <VbenButton size="tiny"
              ><VbenIconify icon="carbon:overflow-menu-vertical"
            /></VbenButton>
          </VbenDropdown> </VbenInputGroup
      ></slot>
    </VbenSpace>

    <Tree
      v-bind="$attrs"
      :data="option"
      :show-irrelevant-nodes="false"
      :pattern="pattern"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot> </template
    ></Tree>
  </div>
</template>

<style scoped></style>
