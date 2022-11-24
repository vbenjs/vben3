<script lang="ts" setup>
import {context} from "../../../../bridge";
import {useI18n} from '@vben/locale'
import { writeTextToClipboard } from '@vben/hooks'
import {unref} from "vue";

const {t} = useI18n();
const {
  useAppStore,
  useConfigStore,
  useMultipleTabStore,
  useUserStore,
} = context
const appStore = useAppStore()
const tabStore = useMultipleTabStore()
const userStore = useUserStore()
const configStore = useConfigStore()

const handleCopy = ()=>{
  writeTextToClipboard(JSON.stringify(unref(configStore.getProjectConfig), null, 2))
  // const { isSuccessRef } = useCopyToClipboard(
  //   JSON.stringify(unref(configStore.getProjectConfig), null, 2),
  // );
  // unref(isSuccessRef) &&
  // createSuccessModal({
  //   title: t('layout.setting.operatingTitle'),
  //   content: t('layout.setting.operatingContent'),
  // });
}

const handleReset = ()=>{
  try {
    configStore.resetProjectConfig();
    // const { colorWeak, grayMode } = defaultSetting;
    // updateTheme(themeColor);
    // updateColorWeak(colorWeak);
    // updateGrayMode(grayMode);
    // createMessage.success(t('layout.setting.resetSuccess'));
  } catch (error: any) {
    // createMessage.error(error);
  }
}

const handleClearAndRedo = () => {
  localStorage.clear()
  appStore.resetAllState()
  // permissionStore.resetState()
  tabStore.resetState()
  userStore.resetState()
  location.reload()
}
</script>
<template>
  <VbenSpace vertical>
    <VbenButton type="info" block @click="handleCopy">
      <template #icon>
        <VbenIconify icon="ant-design:snippets-twotone"/>
      </template>
      {{ t('layout.setting.copyBtn') }}
    </VbenButton>
    <VbenButton type="warning" @click="handleReset" block>
      <template #icon>
        <VbenIconify icon="ant-design:reload-outlined"/>
      </template>
      {{ t('common.resetText') }}
    </VbenButton>
    <VbenButton type="error" block @click="handleClearAndRedo">
      <template #icon>
        <VbenIconify icon="ant-design:redo-outlined"/>
      </template>
      {{ t('layout.setting.clearBtn') }}
    </VbenButton>
  </VbenSpace>
</template>
