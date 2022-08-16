<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons-vue'

const emit = defineEmits(['toggle-collapse'])

defineProps({
  sider: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
})

function toggleCollapse() {
  emit('toggle-collapse')
}
</script>

<template>
  <span @click="toggleCollapse">
    <template v-if="sider">
      <double-right-outlined v-if="collapsed" />
      <double-left-outlined v-else />
    </template>
    <template v-else>
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </template>
  </span>
</template>
