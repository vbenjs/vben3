<template>
  <div class="bg-light-400 p-5 mx-2 flex justify-between gap-x-2">
    <div class=" flex flex-col gap-y-5">
      <div class="flex justify-evenly gap-x-3">
        <div class="bg-white w-1/3 h-40 rounded-3xl p-2 grid grid-cols-12 grid-rows-6 shadow-xl shadow-light-600">
          <p class="col-start-1 col-span-3 row-start-2 row-span-2 text-lg text-gray-400 m-auto">
            活跃设备
          </p>
          <div class="col-start-2 col-span-1 row-start-4 row-span-2 flex items-center justify-center">
            <CountTo
                :duration="1000"
                :endVal="200"
                :startVal="100"
                class="text-3xl"
                color="#595959"
            />
          </div>
          <div class="col-start-4 col-span-10 row-start-1 row-span-6">
            <v-chart ref="lineChart" :option="e1_option" autoresize/>
          </div>
        </div>
        <div class="bg-white w-1/3 h-40 rounded-3xl grid grid-cols-12 grid-rows-6 shadow-xl shadow-light-600">
          <p class="col-start-1 col-span-6 row-start-2 row-span-2 text-lg text-gray-400 m-auto">
            活跃设备
          </p>
          <div class="col-start-2 col-span-4 row-start-4 row-span-2 flex items-center justify-center">
            <CountTo
                :duration="300"
                :endVal="DeviceOnline.online"
                :startVal="0"
                class="text-3xl"
                color="#595959"
            />
          </div>
          <div class="col-start-6 col-span-7 row-start-1 row-span-6">
            <v-chart ref="DeviceRef" :option="Device_chart" autoresize/>
          </div>
        </div>
        <div class="bg-white w-1/3 h-40 rounded-3xl grid grid-cols-12 grid-rows-6 shadow-xl shadow-light-600">
          <p class="col-start-1 col-span-5 row-start-2 row-span-2 text-lg text-gray-400 m-auto">
            收入来源
          </p>
          <div
              class="col-start-2 col-span-3 row-start-4 row-span-2 flex items-center justify-center"
          ></div>
          <div class="col-start-1 col-span-12 row-start-1 row-span-6">
            <v-chart ref="pieChart" :option="e3_option" autoresize/>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white p-5 w-full h-96 rounded-3xl grid grid-cols-12 grid-rows-6 shadow-xl shadow-light-600">
          <div class="col-start-1 col-span-12 row-start-1 row-span-6">
            <v-chart ref="lineCharts2" :option="Order_chart" autoresize/>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="flex flex-col items-center gap-y-5 w-1/4">-->
    <!--      <div class="bg-white w-11/12 h-1/2 p-5 rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl shadow-light-600">-->
    <!--        <div class="col-start-1 col-span-12 row-start-1 row-span-12">-->
    <!--          <v-chart ref="barChart" :option="e5_option" autoresize />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div-->
    <!--        class="bg-white w-11/12 h-1/2 rounded-lg grid grid-cols-12 grid-rows-12 shadow-xl shadow-light-600"-->
    <!--      >-->
    <!--        <div class="col-start-1 col-span-12 row-start-1 row-span-12">-->
    <!--          <v-chart ref="calendarChart" :option="e6_option" autoresize />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {CountTo} from '@vben/components/index'
import * as echarts from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {
  LineChart,
  GaugeChart,
  PieChart,
  BarChart,
  HeatmapChart,
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  GeoComponent,
  DataZoomComponent,
  CalendarComponent,
  VisualMapComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

// import { operatorColumns } from './modules/schema'
import {api_entry} from '@/apis/home'
// import { getOperatorData } from '@vben/demo/src/apis/table'

const DeviceOnline = ref({
  online: 30,
  max: 500,
})

echarts.use([
  CanvasRenderer,
  LineChart,
  GaugeChart,
  PieChart,
  BarChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  GeoComponent,
  DataZoomComponent,
  CalendarComponent,
  VisualMapComponent,
])
const e1_option = ref({
  grid: {
    width: '80%',
    height: '80%',
    top: 20,
    left: 40,
  },
  series: [
    {
      name: 'text',
      type: 'line',
      data: [140, 100, 170, 20],
      smooth: true,
      itemStyle: {
        color: '#36cfc9',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1.5, [
          {
            offset: 0,
            color: '#36cfc9',
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)',
          },
        ]),
      },
    },
  ],
  xAxis: {
    type: 'category',
    show: false,
    boundaryGap: false,
    data: ['', '', '', ''],
  },
  yAxis: {
    type: 'value',
    splitNumber: 2,
  },
})
const Device_chart = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '80%'],
      radius: '100%',
      min: 0,
      max: DeviceOnline.value.max,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          width: 10,
          color: [
            [0.25, '#ff6e76'],
            [0.5, '#fddd60'],
            [0.75, '#58d9f9'],
            [1, '#7cffb2'],
          ],
        },
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '15%',
        width: 10,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        length: 5,
        lineStyle: {
          color: 'auto',
          width: 1,
        },
      },
      splitLine: {
        length: 1,
        lineStyle: {
          color: 'auto',
          width: 1,
        },
      },
      axisLabel: {
        show: false,
        color: '#464646',
        fontSize: 12,
        distance: -18,
        rotate: 'tangential',
        formatter: function (value: any) {
          if (value === 10000) {
            return 'A'
          } else if (value === 6000) {
            return 'B'
          } else if (value === 2000) {
            return 'C'
          } else if (value === 50) {
            return 'D'
          }
          return ''
        },
      },
      title: {
        show: false,
        offsetCenter: [0, '-20%'],
        fontSize: 15,
      },
      detail: {
        fontSize: 20,
        offsetCenter: [0, '-20%'],
        valueAnimation: true,
        color: 'inherit',
      },
      data: [
        {
          value: DeviceOnline.value.online,
          name: '活跃设备',
        },
      ],
    },
  ],
})
const DeviceRef = ref()
const e3_option = ref({
  color: ['#afffff', '#74dbef', '#5e88fc', '#264e86'],
  title: {
    show: false,
  },
  tooltip: {
    show: false,
  },
  legend: {
    show: true,
    orient: 'vertical',
    itemGap: 5,
    height: 50,
    top: 80,
    left: '10%',
  },
  series: [
    {
      name: '收入来源',
      type: 'pie',
      radius: ['40%', '80%'],
      center: ['50%', '50%'],
      left: '40%',
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 2500,
          name: '项目',
        },
        {
          value: 1000,
          name: '广告',
        },
        {
          value: 1000,
          name: '服务',
        },
        {
          value: 500,
          name: '其他',
        },
      ],
    },
  ],
})
const Order_chart = ref({
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  grid: {
    width: '85%',
    height: '80%',
    top: 40,
    left: 40,
  },
  title: {
    text: '订单统计',
    textStyle: {
      color: '#3b3a39',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: '40%',
    data: ['直接访问', '邮件营销'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)',
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      animationDelay: function (idx: any) {
        return idx * 10
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)',
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      animationDelay: function (idx: any) {
        return idx * 10 + 100
      },
      data: [120, 282, 111, 234, 220, 340, 310],
    },
  ],
})
let entry = null
onMounted(() => {
  const handleEntry = async () => {
    const res = await api_entry()
    DeviceOnline.value = res.device_online
    DeviceRef.value &&
    DeviceRef.value.setOption({
      series: [{
        max: DeviceOnline.value.max,
        data: [
          {
            value: DeviceOnline.value.online,
            name: '活跃设备',
          },
        ]
      }],

    })

  }
  console.log("创建 entry")
  handleEntry()
  entry = setInterval(handleEntry, 5000)
})


onBeforeUnmount(() => {
  console.log("销毁 entry")
  clearInterval(entry)
})
</script>