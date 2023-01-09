<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { context } from '../../../../bridge'
const { usePromise, useTabs } = context
const { refreshPage, close, closeAll, getTabIndex } = useTabs()

const x = ref(0)
const y = ref(0)
const tab = $ref(null)
const showDropdown = ref(false)

const options = computed(() => {
  return [
    {
      label: '重新加载',
      key: 'reload',
    },
    {
      label: '关闭标签',
      key: 'close',
      disabled: !(getTabIndex(tab) > 0) || tab.meta.affix,
    },
    {
      label: '关闭所有标签',
      key: 'closeAll',
    },
  ]
})

const openDropdown = (e, t) => {
  tab = t
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

function reload() {
  return new Promise(async (resolve) => {
    await refreshPage()
    setTimeout(() => {
      resolve({})
    }, 1200)
  })
}

const { loading, handleFn: handleRedo } = usePromise(reload, {
  immediate: false,
})
const handleSelect = (k) => {
  console.log(k)
  const i = getTabIndex(tab)
  console.log(i)
  switch (k) {
    case 'reload':
      reload()
      return
    case 'close':
      close(tab)
      return
    case 'closeAll':
      closeAll()
      return
  }
}
defineExpose({ openDropdown })
</script>
<template>
  <VbenDropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    v-model:show="showDropdown"
    @clickoutside="showDropdown = false"
    @select="handleSelect"
  >
  </VbenDropdown>
</template>
