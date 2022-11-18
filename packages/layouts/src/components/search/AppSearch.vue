<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { ref } from 'vue'
import AppSearchModal from './AppSearchModal.vue'

const { t } = useI18n()
const showModal = ref(false)

function changeModal(show: boolean) {
  showModal.value = show
}
</script>

<template>
  <div class="flex items-center" @click="changeModal(true)">
    <VbenPopover placement="bottom">
      <template #trigger>
        <VbenIconify icon="ant-design:search-outlined" hoverPointer />
      </template>
      {{ t('common.searchText') }}
    </VbenPopover>
    <AppSearchModal @close="changeModal(false)" :visible="showModal" />
  </div>
</template>
