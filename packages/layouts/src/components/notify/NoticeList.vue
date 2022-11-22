<script lang="ts" setup>
import { computed, ref, watch, unref } from 'vue'
import { ListItem } from './data'
import { isNumber } from '@vben/utils'

const {
  list = [],
  pageSize = 5,
  currentPage = 1,
  titleRows = 1,
  descRows = 2,
  onTitleClick = null,
} = defineProps<{
  list: Array<ListItem>
  pageSize?: boolean | number
  currentPage?: number
  titleRows?: number
  descRows?: number
  onTitleClick?: (Recordable) => void
}>()
const current = ref(currentPage || 1)
const getData = computed(() => {
  if (pageSize === false) return []
  let size = isNumber(pageSize) ? pageSize : 5
  return list.slice(size * (unref(current) - 1), size * unref(current))
})
watch(
  () => currentPage,
  (v) => {
    current.value = v
  },
)

function handleTitleClick(item: ListItem) {
  onTitleClick && onTitleClick(item)
}
</script>
<template>
  <VbenList class="vben-header-notify-list" bordered>
    <template v-for="item in getData" :key="item.id">
      <VbenListItem>
        <VbenThing>
          <template #header>
            <VbenEllipsis
              class="w-40 text-sm cursor-pointer"
              @click="handleTitleClick"
            >
              {{ item.title }}
            </VbenEllipsis>
          </template>

          <template #avatar>
            <VbenAvatar v-if="item.avatar" round :src="item.avatar" />
            <span v-else> {{ item.avatar }}</span>
          </template>

          <template #description>
            <div v-if="item.type == '3'">
              <VbenTag size="small" :type="item.color">
                {{ item.extra }}
              </VbenTag>
              <div class="text-gray-600 text-sm py-1">
                {{ item.description }}
              </div>
            </div>
            <div v-else class="text-gray-400 text-xs">
              {{ item.datetime }}
            </div>
          </template>
        </VbenThing>
      </VbenListItem>
    </template>
  </VbenList>
</template>

<style lang="less" scoped>
.vben-header-notify-list {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
