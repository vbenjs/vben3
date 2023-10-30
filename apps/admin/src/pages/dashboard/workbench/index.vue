<script lang="ts" setup>
import * as echarts from "echarts/core"
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from "echarts/charts"
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, } from "echarts/components"
import vChart from "vue-echarts"
import { ref } from 'vue';
echarts.use([
  BarChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
])
let isActive = ref(-1)

function handleActive(index: number) {
  return isActive.value = index
}

const chartOption = ref({
  grid: {
    width: '85%',
    height: '70%',
    top: 80,
    left: 60,
  },
  color: [],
  title: {
    text: "待办统计",
    textStyle: {
      color: '#6B7280'
    },
    left: 10,
    top: 10,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  legend: {
    show: false
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true,
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '数量',
      max: 2000,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name: '今年',
      type: 'bar',
      left: '40%',
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        200, 300, 350, 400, 500, 600, 700
      ],
      barWidth: 10,
      itemStyle: {
        borderRadius: 2,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#BCF0D5"
          },
          {
            offset: 1,
            color: '#55D995'
          }
        ])
      }
    },
    {
      name: '去年',
      type: "bar",
      data: [230, 300, 350, 420, 520, 650, 780],
      barWidth: 10,
      itemStyle: {
        borderRadius: 2,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#BCF0D5"
          },
          {
            offset: 1,
            color: '#55D995'
          }
        ])
      }
    }
  ]
})
</script>
<template>
  <div class="grid grid-cols-24 grid-rows-24 w-full h-screen">
    <!-- Profile Container -->
    <div class="ml-4 mr-4 p-4 col-start-1 col-span-24 row-start-2 row-span-6 bg-green-100 rounded-md">
      <!-- User Information start -->
      <div class="grid grid-cols-24 grid-rows-24 w-full h-full">
        <div class="col-start-1 col-span-4 row-start-1 row-span-23 flex justify-center items-center">
          <img class="drop-shadow-xl" src="@/assets/images/avatar_man.png" width="200" height="200" alt="avatar.png" />
        </div>
        <div class="col-start-5 col-span-7 row-start-1 row-span-20 flex flex-col items-start justify-around">
          <div class="flex">
            <div
              class="w-14 h-17 bg-green-400 rounded-md shadow-xl flex flex-col justify-around items-center cursor-pointer">
              <div class="text-white text-xl">Fir</div>
              <div class="text-white text-3xl">20</div>
            </div>
            <div class="weather h-17 ml-2 flex flex-col justify-between">
              <div class="font-bold flex">
                <VbenIconify icon="ion:snow" size="20" />
                <span class="ml-2">-10°</span>
              </div>
              <div class="text-slate-500 font-bold text-base/7 italic whitespace-nowrap">工欲善其事，必先利其器</div>
            </div>
          </div>
          <div class="text-2xl font-bold">早上好，管理员</div>
        </div>
      </div>
      <!-- User Information end -->
    </div>

    <!-- Card Container -->
    <div
      class="card row-start-7 row-span-4 col-start-2 col-span-5 bg-black/25 rounded-md flex flex-col justify-around items-center ">
      <div class="text-white/60 text-xl font-bold">今日待办</div>
      <div class=" w-3/4 flex justify-around">
        <div class="">
          <img src="@/assets/images/Todo.png" alt="todo icon" />
        </div>
        <div class="flex justify-center items-end mb-5">
          <div class="text-white/60 font-semibold text-5xl">23</div>
          <div class="text-white/60 font-semibold text-2xl">项</div>
        </div>
      </div>
    </div>
    <div
      class="card row-start-7 row-span-4 col-start-8 col-span-5 bg-black/25 rounded-md flex flex-col justify-around items-center">
      <div class="text-white/60 text-xl font-bold">通知</div>
      <div class="w-3/4 flex justify-around">
        <div>
          <img src="@/assets/images/Notification.png" alt="Notification icon" />
        </div>
        <div class="w-3/4 text-left flex flex-col justify-center">
          <div class="w-full text-white/60 text-lg font-semibold flex items-center">
            <VbenIconify icon="iconamoon:check-bold" size="24" color="#169b82" /><span class="ml-2">已读 10 条</span>
          </div>
          <div class="w-full text-white/60 text-lg font-semibold flex items-center">
            <VbenIconify icon="solar:letter-unread-bold" size="24" /> <span class="ml-2">未读 5 条</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Todo Container -->
    <div
      class="row-start-12 row-span-12 col-start-2 col-span-6 rounded-md border border-solid border-gray-200 flex flex-col">
      <div class="w-full h-1/10 border-b-1 border-b-solid border-gray-200 flex items-center">
        <span class="ml-4 text-lg text-gray-500 font-semibold">待办列表</span>
      </div>
      <div class="h-9/10 m-3 overflow-auto ">
        <template v-for="(item, index) in 6">
          <div class="w-full h-1/7 hover:bg-green-100 rounded-md mb-2 flex" @mouseenter="handleActive(index)"
            @mouseleave="(() => { isActive = -1 })">
            <div class="w-5/6 h-full flex items-center">
              <div class="w-10 h-10 rounded-lg border border-solid border-gray-200 ml-4 overflow-hidden">
                <img src="@/assets/images/avatar01.png" width="100%" height="100%" alt="avatar" />
              </div>
              <div class="ml-2">
                <div class="text-4 font-semibold">Jack</div>
                <div class="text-xs text-gray-500">创建了一个待办，等待你审核</div>
              </div>
            </div>
            <div class="w-1/6 flex items-center invisible cursor-pointer" :class="{ active: isActive === index }">处理</div>
          </div>
        </template>
      </div>
    </div>

    <!-- calendar chart -->
    <div class="row-start-12 row-span-12 col-start-9 col-span-10 rounded-md border border-solid border-gray-200 flex">
      <v-chart ref="barChat" :option="chartOption" autoresize />
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  backdrop-filter: blur(16px);
}

.active {
  visibility: visible;
}
</style>
