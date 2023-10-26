<script lang="ts" setup>
import {context} from '../../../bridge'
import {createNamespace} from '@vben/utils'

const {useMenuSetting} = context
const {toggleCollapsed, getCollapsed} = useMenuSetting()

const {bem} = createNamespace('footer-trigger')
</script>
<template>
  <div
    :class="bem()"
    class="h-6 flex justify-center items-center"
    @click="toggleCollapsed"
  >
    <svg
      focusable="false"
      :class="getCollapsed ? 'rotate-180' : ''"
      data-icon="double-left"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      viewBox="64 64 896 896"
    >
      <path
        d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"
      />
    </svg>
  </div>
</template>
