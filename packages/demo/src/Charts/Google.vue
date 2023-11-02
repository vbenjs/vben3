<script lang="ts" setup>
import { ref, unref, onMounted } from 'vue';
/* import { Loader } from "@googlemaps/js-api-loader" */
import { useScript } from '@vben/hooks'
import { useDebounceFn } from '@vben/utils'

// 可以换@googlemaps/js-api-loader 软件包方案
const MAP_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCPBFJ6Dkc0dLcqr8_wCfWyGUGwNN5N5G8&callback=initGoogleMap'
// @googlemaps/js-api-loader 软件包方案
/* const loader = new Loader({
apiKey: "YOUR_API_KEY",
version: "weekly",
...additionalOptions,
}); */

/* loader.load().then(async () => {
const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
map = new Map(document.getElementById("map") as HTMLElement, {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
});
}); */

defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: 'calc(100vh - 90px)', }
})
const emit = defineEmits(['change-point', 'point-changed'])

const wrapGoogleRef = ref<HTMLDivElement | null>(null);
const { toPromise } = useScript({ src: MAP_URL }, true);

let map = ref()
let markers: any[] = []
let googleMaps = ref()

const initGoogleMap = async () => {
  await toPromise();
  setTimeout(() => {
    const wrapGoogleEl = unref(wrapGoogleRef);
    if (!wrapGoogleEl) return;
    googleMaps.value = (window as any).google.maps;
    const latLng = { lat: 31.508123, lng: 120.373487 };
    map.value = new googleMaps.value.Map(wrapGoogleEl, {
      center: latLng,
      zoom: 15,
      mapTypeControl: false,
      disableDefaultUI: true,
    });
    map.value.addListener('click', function (e) {
      deleteMarkers()
      addMarker(e.latLng)
      latlng2text(e.latLng)
      emit('change-point', { lat: e.latLng.lat(), lng: e.latLng.lng() })
    });
  }, 100)
}

const addMarker = (position) => {
  const marker = new googleMaps.value.Marker({
    position,
    map: map.value,
  });

  markers.push(marker);
}

function deleteMarkers(): void {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 地理坐标转化成具体的地理位置
const latlng2text = (point) => {
  const geocoder = new googleMaps.value.Geocoder();
  geocoder.geocode({ location: point }, (result, status) => {
    if (status === 'OK') {
      emit('point-changed', result[0].formatted_address)
    } else {
      console.log('parse error')
    }
  })
}

const handleInput = useDebounceFn((value: string) => {
  const geocoder = new googleMaps.value.Geocoder();
  geocoder.geocode({ address: value }, (result, status) => {
    if (status === 'OK') {
      map.value.setCenter(result[0].geometry.location);
    }
  })
}, 500);

onMounted(() => {
  initGoogleMap()
});
</script>

<template>
  <div class="gmap-input">
    <VbenInput placeholder="search" clearable @input="handleInput">
      <template #prefix>
        <VbenIconify :size="20" color="gray" icon="ant-design:search-outlined" />
      </template>
    </VbenInput>
  </div>
  <div ref="wrapGoogleRef" :style="{ height, width }"></div>
</template>

<style lang="less" scoped>
.gmap-input {
  margin: 15px;
  position: absolute;
  width: 320px;
  z-index: 10000;
}
</style>
