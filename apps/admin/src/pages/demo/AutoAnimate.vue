<template>
  <div class="w-full">
    <div class="p-2 mb-2">
      <button
        class="button p-3 bg-blue-5 text-white border-none m-1"
        @click="insertAtSecond"
      >
        Insert at second
      </button>
      <button
        class="button p-3 bg-blue-5 text-white border-none m-1"
        @click="removeLastOne"
      >
        Remove Last one
      </button>
      <button
        class="button p-3 bg-blue-5 text-white border-none m-1"
        @click="sortAsc"
      >
        Sort A-Z ↑ border-none m-1
      </button>
      <button
        class="button p-3 bg-blue-5 text-white border-none m-1"
        @click="sortDesc"
      >
        Sort Z-A ↓
      </button>
    </div>
    <div class="h-700px overflow-y-auto flex flex-wrap">
      <div
        v-for="(plugin, pluginName) in autoAnimationPlugins"
        :key="pluginName"
        class="w-400px"
      >
        <div class="text-blue-500 p-2 font-bold w-full">
          using {{ pluginName }} plugin:
        </div>
        <ul v-auto-animate="plugin">
          <li
            v-for="item in items"
            class="bg-purple-5 text-white list-none mb-2 p-3 rounded-md flex justify-between items-center"
            :key="item"
          >
            <span>{{ item }}</span>
            <button
              aria-label="Remove Fruit"
              @click="items = items.filter((f) => f !== item)"
              class="border-none bg-transparent"
            >
              <span class="text-red-5 w-5">X</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="AutoAnimate">
import { ref } from 'vue'

import { vAutoAnimate } from '@vben/utils'
import { autoAnimationPlugins } from '@vben/utils/src/autoAnimate'

const items = ref(['React', 'Solid', 'Vue', 'Svelte', 'Angular'])
const getRandomChar = () =>
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')[
    Math.floor(Math.random() * 62)
  ]
const getRandomWord = () =>
  Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () =>
    getRandomChar(),
  ).join('')

function insertAtSecond() {
  items.value = [
    ...items.value.slice(0, 1),
    getRandomWord(),
    ...items.value.slice(1),
  ]
}

function removeLastOne() {
  items.value = [...items.value.slice(0, items.value.length - 1)]
}

function sortAsc() {
  items.value.sort()
}

function sortDesc() {
  items.value.sort().reverse()
}
</script>
