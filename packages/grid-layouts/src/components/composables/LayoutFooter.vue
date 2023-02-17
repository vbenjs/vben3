<script lang="ts" setup>
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import { useAppConfig, useSiteGeneral } from '@vben/hooks'
import { useI18n } from '@vben/locale'

const { t } = useI18n()

const { footer } = useAppConfig()
const { copyright, links } = useSiteGeneral()
</script>
<template>
  <footer
    class="overflow-hidden relative bg-[rgb(250, 250, 252)] dark:bg-[var(--component-background-color)] text-3 flex flex-col justify-evenly"
    :class="[footer.visible ? 'visible' : 'invisible']"
  >
    <div class="flex items-center justify-center">
      <template v-for="(item, index) in links" :key="index">
        <a
          v-if="item.label || item.icon"
          :href="item.url"
          target="_blank"
          class="decoration-none mx-5 flex-center color-blue-gray-400 cursor-pointer hover:color-blue-gray-800 dark:hover:color-blue-gray-50"
        >
          <VbenIconify :icon="item.icon" size="18" />
          <span>{{ t(item.label) }}</span>
        </a>
      </template>
    </div>
    <div class="flex-center color-blue-gray-400">
      Copyright ©{{ copyright }}
    </div>
    <SecondaryBorder top />
  </footer>
</template>
