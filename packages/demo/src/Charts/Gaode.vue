<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import '@amap/amap-jsapi-types'

defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: 'calc(100vh - 90px)',
  },
})

let map = null

onMounted(() => {
  // 您在2021年12月02日以后申请的 key 需要配合您的安全密钥一起使用。
  window['_AMapSecurityConfig'] = {
    securityJsCode: 'e6cdf70d6db73a22e948ba4addafdddf',
  }

  AMapLoader.load({
    key: 'b3b5ff64593dae7b68d3daef978dbe3a', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      })

      map.addControl(new AMap.Scale())
      map.addControl(new AMap.ToolBar())
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container" :style="{ height, width }"></div>
</template>
