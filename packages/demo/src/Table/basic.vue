<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {VbenColumns} from '../../../vbenComponents/src/table'
import {getTableData} from '../apis/table'
// import {msg} from '@vben/vbencomponents'
// const { createMessage } = useMessage()

// createMessage.loading(t('sys.app.menuLoading'))
const border = ref(false)
const loading = ref(false)
const striped = ref(false)
const columns: VbenColumns = [
  {field: 'userId', title: 'id', width: 200},
  {field: 'username', title: '名称'},
  {field: 'realname', title: '真实名称',},
  {
    field: 'desc',
    title: '备注',
  },
]
const data = reactive({
  table: {}
})
getTableData().then(res => {
  console.log(res)
  for (let i = 0; i < 4 ; i++) {
    res.items = res.items.concat(res.items)
  }
  console.log(res)
  data.table = res
})
const toggleBorder = () => {
  border.value = !border.value
}

const toggleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
function toggleStriped() {
  striped.value = !striped.value;
}
</script>
<template>
  <div class="p-2 h-full">
    <VbenTable
      :options="{
      title: '基础示例',
      pagination:true,
      border:border,
      loading: loading,
      stripe: striped,
      }"
      :columns="columns"
      :data="data.table.items">
      <template #toolbar>
        <div class="pb-2">
          <VbenButton type="primary" @click="toggleBorder">
            {{ !border ? '显示边框' : '隐藏边框' }}
          </VbenButton>
          <VbenButton class="ml-2" type="primary" @click="toggleLoading"> 开启loading</VbenButton>
          <VbenButton class="ml-2" type="primary" @click="toggleStriped">
            {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
          </VbenButton>
        </div>

      </template>
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VbenTable>
  </div>
</template>
