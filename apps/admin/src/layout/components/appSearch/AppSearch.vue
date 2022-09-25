<template>
  <div class="p-1 flex items-center" @click="changeModal(true)">
    <VbenPopover placement="bottom">
      <template #trigger>
        <VbenIconify icon="ant-design:search-outlined" />
      </template>
      {{ t('common.searchText') }}
    </VbenPopover>
    <AppSearchModal @close="changeModal(false)" :visible="showModal" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { ref } from 'vue'
import AppSearchModal from './AppSearchModal.vue'
import { VbenIconify } from '../../../../../../packages/vbenComponents/src/iconify'

const { t } = useI18n()
const showModal = ref(false)

function changeModal(show: boolean) {
  showModal.value = show
}
</script>
