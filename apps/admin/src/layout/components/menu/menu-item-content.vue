<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from '@vben/locale'
import { Icon } from '@components/common'
const { t } = useI18n()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const i18nName = computed(() => t(props.item?.name))
const icon = computed(() => props.item?.icon)
</script>

<template>
  <span>
    <Icon v-if="icon" :icon="icon" :size="18" />
    {{ i18nName }}
  </span>
</template>
