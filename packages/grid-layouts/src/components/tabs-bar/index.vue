<script lang="ts" setup>
import { ref, unref } from 'vue'
import TabItem from './components/TabItem.vue'

const name = ref(1)
// const message = useMessage()
const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
function handleClose(name: number) {
  if (unref(panels).length === 1) {
    // message.error('最后一个了')
    return
  }
  // message.info('关掉 ' + name)
  const index = unref(panels).findIndex((v) => name === v)
  unref(panels).splice(index, 1)
  if (unref(panels) === name) {
    panels.value = panels[index]
  }
}
</script>
<template>
  <VbenTabs
    v-model:value="name"
    type="card"
    size="small"
    animated
    tab-style="--n-tab-padding: 0;"
    :tabs-padding="8"
    @close="handleClose"
  >
    <VbenTab v-for="(panel, index) in panels" :key="panel" :name="panel">
      <TabItem
        :title="panel.toString()"
        :closable="index === 0"
        :active="panel === name"
      />
    </VbenTab>
    <VbenTabPane
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
    >
      {{ panel }}
    </VbenTabPane>
  </VbenTabs>
</template>
<style lang="scss" scoped></style>
