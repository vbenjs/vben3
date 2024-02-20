<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
// import { VbenColumns } from '../../../vbenComponents/src/table'
import { getTableData } from '../apis/table'
import { Data, baseColumns } from './schemas'
import { dataTool } from 'echarts';

const border = ref(['none', 'outer', 'inner', 'full'])
const index = ref(0)
let loading = ref(false)
const striped = ref(false)
const round = ref(false)
const pageConfig = reactive({
  loading: false,
  size: 'small',
  background: true,
})

const data = reactive<Data>({
  table: {
    items: [],
    total: 0,
  },
})
const params = ref({
  i: "role",
  a: "list"
})

const handlePageChange = () => {
  console.log('page change');
}

const toggleBorder = () => {
  index.value++
  if (index.value >= border.value.length) {
    index.value = 0
  }
}
const borderValue = computed(() => {
  return border.value[index.value]
})

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
function toggleStriped() {
  striped.value = !striped.value
}

function toggleRound() {
  round.value = !round.value
  console.log('round ->', round.value)
}
</script>
<template>
  <div class="p-2 h-full">
    <VbenTable
      :options="{ title: '基础演示', pagination: pageConfig, border: borderValue, loading: loading, stripe: striped, round: round, api: getTableData }"
      :columns="baseColumns" :column-config="{ resizable: true }" :row-config="{ isHover: true }">
      <template #toolbar>
        <div class="pb-2">
          <VbenButton type="primary" @click="toggleBorder">
            边框:{{ borderValue }}
          </VbenButton>
          <VbenButton class="ml-2" type="primary" @click="toggleLoading">
            开启loading</VbenButton>
          <VbenButton class="ml-2" type="primary" @click="toggleStriped">
            {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
          </VbenButton>
          <VbenButton class="ml-2" type="primary" @click="toggleRound">
            {{ !round ? '显示圆角' : '隐藏圆角' }}
          </VbenButton>
        </div>
      </template>
      <template #action>
        <VbenButton size="tiny" strong secondary type="primary">
          EDIT
        </VbenButton>
        <VbenDivider vertical />
        <VbenButton size="tiny" strong secondary type="error">
          DELETE
        </VbenButton>
      </template>
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VbenTable>
  </div>
</template>
