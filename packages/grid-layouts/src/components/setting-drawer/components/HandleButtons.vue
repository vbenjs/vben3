<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { useHandler } from '../../../hooks/useHandler'

const { t } = useI18n()
const { copySetting, resetSetting, clearAndRedo } = useHandler()
</script>
<template>
  <VbenSpace vertical>
    <VbenButton type="info" block @click="copySetting">
      <template #icon>
        <VbenIconify icon="ant-design:snippets-twotone" />
      </template>
      {{ t('layout.setting.copyBtn') }}
    </VbenButton>
    <VbenButton type="warning" @click="resetSetting" block>
      <template #icon>
        <VbenIconify icon="ant-design:reload-outlined" />
      </template>
      {{ t('common.resetText') }}
    </VbenButton>
    <VbenButton type="error" block @click="clearAndRedo">
      <template #icon>
        <VbenIconify icon="ant-design:redo-outlined" />
      </template>
      {{ t('layout.setting.clearBtn') }}
    </VbenButton>
  </VbenSpace>
</template>
