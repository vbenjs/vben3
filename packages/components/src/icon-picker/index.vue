<script lang="ts" setup>
import { ref, watchEffect, watch } from 'vue'
import Icon from '../icon/index.vue'
import SvgIcon from '../svg-icon/index.vue'
import { createNamespace } from '@vben/utils'
import iconsData from './icons.data'
import { usePagination, copyTextToClipboard } from '@vben/hooks'
import { useDebounceFn } from '@vben/utils'
import { useI18n } from '@vben/locale'
import svgIcons from 'virtual:svg-icons-names'

function getIcons() {
  const prefix = iconsData.prefix
  return iconsData.icons.map((icon) => `${prefix}:${icon}`)
}

function getSvgIcons() {
  return svgIcons.map((icon: string) => icon.replace('icon-', ''))
}

export interface Props {
  value?: string
  width?: string
  pageSize?: number
  copy?: boolean
  mode?: 'svg' | 'iconify'
  allowClear?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  width: '100%',
  pageSize: 140,
  copy: true,
  mode: 'iconify',
  allowClear: true,
  readonly: false,
})

// Don't inherit FormItem disabled、placeholder...
defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['change', 'update:value'])

const isSvgMode = props.mode === 'svg'
const icons = isSvgMode ? getSvgIcons() : getIcons()

const currentSelect = ref('')
const searchKey = ref('')
const currentList = ref(icons)
const trigger = ref<HTMLDivElement>()

const triggerPopover = () => {
  if (trigger.value) {
    trigger.value.click()
  }
}

const { t } = useI18n()
const { bem } = createNamespace('icon-picker')

const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100)

const { getPaginationList, getTotal, setCurrentPage, currentPage } =
  usePagination(currentList, props.pageSize)

watchEffect(() => {
  currentSelect.value = props.value
})

watch(
  () => currentSelect.value,
  (v) => {
    emit('update:value', v)
    emit('change', v)
  },
)
function handlePageChange(page: number) {
  setCurrentPage(page)
}

function handleClick(icon: string) {
  currentSelect.value = icon
  if (props.copy) {
    copyTextToClipboard(icon)
  }
}

function handleSearchChange(value: string) {
  searchKey.value = value
  if (!value) {
    setCurrentPage(1)
    currentList.value = icons
    return
  }
  currentList.value = icons.filter((item) => item.includes(value))
}
</script>

<template>
  <vben-input-group :style="{ width }">
    <vben-input
      :placeholder="t('component.icon.placeholder')"
      v-model:value="currentSelect"
      @click="triggerPopover"
      :clearable="props.allowClear"
      :readonly="props.readonly"
    />
    <vben-popover trigger="click" :content-class="bem('popover')">
      <template #header>
        <div class="flex justify-between">
          <vben-input
            :placeholder="t('component.icon.search')"
            v-model:value="searchKey"
            @update:value="debounceHandleSearchChange"
            clearable
          />
        </div>
      </template>
      <template #default>
        <div v-if="getPaginationList.length">
          <vben-scrollbar class="border border-solid" style="max-height: 200px">
            <ul class="flex flex-wrap px-2">
              <li
                v-for="icon in getPaginationList"
                :key="icon"
                :class="currentSelect === icon ? 'border border-primary' : ''"
                class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                @click="handleClick(icon)"
                :title="icon"
              >
                <SvgIcon v-if="isSvgMode" :icon="icon" />
                <Icon v-else :icon="icon" />
              </li>
            </ul>
          </vben-scrollbar>
          <div class="flex py-2 items-center justify-center">
            <vben-pagination
              size="small"
              :page="currentPage"
              :page-size="pageSize"
              :item-count="getTotal"
              @update:page="handlePageChange"
            />
          </div>
        </div>
        <template v-else>
          <div class="p-5"><vben-empty description="你什么也找不到" /></div>
        </template>
      </template>
      <template #trigger>
        <div ref="trigger">
          <vben-button>
            <SvgIcon
              v-if="isSvgMode && currentSelect"
              :size="20"
              :icon="currentSelect"
            />
            <Icon v-else :icon="currentSelect || 'ion:apps-outline'" />
          </vben-button>
        </div>
      </template>
    </vben-popover>
  </vben-input-group>
</template>

<style lang="less">
.icon-picker {
  &__popover {
    width: 300px;
  }
}
</style>
