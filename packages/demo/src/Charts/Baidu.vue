<script lang="ts" setup>
import { ref, unref, onMounted } from 'vue';
import { useDebounceFn } from '@vben/utils'
import { useScript } from '@vben/hooks'

defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: 'calc(100vh - 90px)',
  }
})
const emit = defineEmits(['change-point', 'point-changed'])
const wrapRef = ref<HTMLDivElement | null>(null);

const map = ref()
const BMap = ref()
const geo = ref()

const BAI_DU_MAP_URL = 'https://api.map.baidu.com/api?v=3.0&ak=qiDNjcA9vYIY7HhzebKkWue4lpSR5z9M&callback=initialize';
const { toPromise } = useScript({ src: BAI_DU_MAP_URL }, true);

const initBaiduMap = async () => {
  await toPromise();
  setTimeout(() => {
    const wrapEl = unref(wrapRef);
    if (!wrapEl) return;
    BMap.value = (window as any).BMap;
    map.value = new BMap.value.Map(wrapEl);
    geo.value = new BMap.value.Geocoder();
    const point = new BMap.value.Point(120.373487, 31.508123);
    map.value.centerAndZoom(point, 15);
    map.value.enableScrollWheelZoom(true);

    map.value.addEventListener('click', function (e) {
      map.value.clearOverlays();
      const pt = e.point;
      const marker = new BMap.value.Marker(new BMap.value.Point(pt.lng, pt.lat));
      map.value.addOverlay(marker);
      latlng2text(pt)
      emit('change-point', e.point)
    });
  }, 100)
}

// 地理坐标转化成具体的地理位置
const latlng2text = (point) => {
  geo.value.getLocation(point, function (rs) {
    if (rs) {
      emit('point-changed', rs.address)
    } else {
      console.log('The address you selected did not resolve to a result')
    }
  })
}

const handleInput = useDebounceFn((value: string) => {
  geo.value.getPoint(value, (point) => {
    if (point) {
      map.value.centerAndZoom(point, 16);
    }
  })
}, 500);

onMounted(() => {
  initBaiduMap();
});

</script>

<template>
  <div class="bmap-input">
    <VbenInput size="small" clearable placeholder="search" @input="handleInput">
      <template #prefix>
        <VbenIconify :size="20" color="gray" icon="ant-design:search-outlined" />
      </template>
    </VbenInput>
  </div>
  <div ref="wrapRef" :style="{ height, width }"></div>
</template>

<style lang="less" scoped>
.bmap-input {
  margin: 15px;
  position: absolute;
  width: 320px;
  z-index: 10000;
}
</style>
