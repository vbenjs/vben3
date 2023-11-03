<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  RadarComponent,
} from 'echarts/components'
import vChart from 'vue-echarts'
import { ref } from 'vue'
echarts.use([
  BarChart,
  RadarChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  RadarComponent,
])
let isActive = ref(-1)

const chartOption = ref({
  grid: {
    width: '85%',
    height: '70%',
    top: 80,
    left: 60,
  },
  title: {
    text: '待办统计',
    textStyle: {
      color: '#6B7280',
      fontWeight: '600',
    },
    left: 10,
    top: 10,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {
    show: false,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '数量',
      max: 2000,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: '已处理',
      type: 'bar',
      left: '40%',
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [200, 300, 350, 400, 500, 600, 700],
      barWidth: 30,
      itemStyle: {
        borderRadius: 2,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#BCF0D5',
          },
          {
            offset: 1,
            color: '#55D995',
          },
        ]),
      },
    },
  ],
})

const memberOption = ref({
  grid: {},
  title: {
    text: '成员待办统计',
    textStyle: {
      color: '#6B7280',
      fontWeight: '600',
    },
    left: 10,
    top:10
  },
  legend: {
    show: false,
  },
  tooltip: {
    trigger: 'item',
  },
  radar: {
    indicator: [
      { name: 'Jack', max: 150 },
      { name: 'Tom', max: 100 },
      { name: 'Fox', max: 200 },
      { name: 'Jerry', max: 122 },
      { name: 'shelly', max: 165 },
      { name: 'Jon Baden', max: 100 },
    ],
    // shape: 'circle',
    splitNumber: 5,
    axisName: {
      color: '#283b56'
    },
  },
  series: [
    {
      name:'已办数量(项)',
      type: 'radar',
      data: [[28, 36, 19, 42, 55, 79]],
      symbol: 'none',
      itemStyle: {
        color: '#55D995'
      },
      lineStyle: {
        width: 1,
        opacity: 0.5
      },
      areaStyle: {
        opacity: 0.5
      }
    }
  ],
})
</script>
<template>
  <div class="grid grid-cols-24 grid-rows-24 w-full h-screen">
    <!-- Profile Container -->
    <div
      class="ml-4 mr-4 p-4 col-start-1 col-span-24 row-start-2 row-span-6 bg-green-100 rounded-md"
    >
      <!-- User Information start -->
      <div class="grid grid-cols-24 grid-rows-24 w-full h-full">
        <div
          class="col-start-1 col-span-4 row-start-1 row-span-23 flex justify-center items-center"
        >
          <img
            class="drop-shadow-xl"
            src="@/assets/images/avatar_man.png"
            width="200"
            height="200"
            alt="avatar.png"
          />
        </div>
        <div
          class="col-start-5 col-span-7 row-start-1 row-span-20 flex flex-col items-start justify-around"
        >
          <div class="flex">
            <div
              class="w-14 h-17 bg-green-400 rounded-md shadow-xl flex flex-col justify-around items-center cursor-pointer"
            >
              <div class="text-white text-xl">Fir</div>
              <div class="text-white text-3xl">20</div>
            </div>
            <div class="weather h-17 ml-2 flex flex-col justify-between">
              <div class="font-bold flex">
                <VbenIconify icon="ion:snow" size="20" />
                <span class="ml-2">-10°</span>
              </div>
              <div
                class="text-slate-500 font-bold text-base/7 italic whitespace-nowrap"
              >
                工欲善其事，必先利其器
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold">早上好，管理员</div>
        </div>
      </div>
      <!-- User Information end -->
    </div>

    <!-- Todo Card -->
    <div
      class="card row-start-7 row-span-4 col-start-2 col-span-5 mr-4 bg-black/25 rounded-md flex flex-col justify-around items-center hover:shadow-xl duration-200 cursor-default"
    >
      <div class="text-white/60 text-xl font-bold">今日待办</div>
      <div class="w-3/4 flex justify-around">
        <div class="">
          <img src="@/assets/images/Todo.png" alt="Todo icon" />
        </div>
        <div class="flex justify-center items-end mb-5">
          <div class="text-white/60 font-semibold text-5xl">23</div>
          <div class="text-white/60 font-semibold text-2xl">项</div>
        </div>
      </div>
    </div>

    <!-- Notice Card -->
    <div
      class="card row-start-7 row-span-4 col-start-7 col-span-5 mr-4 bg-black/25 rounded-md flex flex-col justify-around items-center hover:shadow-xl duration-200 cursor-default"
    >
      <div class="text-white/60 text-xl font-bold">通知</div>
      <div class="w-3/4 flex justify-around">
        <div>
          <img src="@/assets/images/Notification.png" alt="Notification icon" />
        </div>
        <div class="text-left flex flex-col justify-center">
          <div
            class="w-full text-white/60 text-lg font-semibold flex items-center truncate"
          >
            <VbenIconify
              icon="iconamoon:check-bold"
              size="24"
              color="#169b82"
            /><span class="ml-2">已读 10 条</span>
          </div>
          <div
            class="w-full text-white/60 text-lg font-semibold flex items-center truncate"
          >
            <VbenIconify icon="solar:letter-unread-bold" size="24" />
            <span class="ml-2">未读 5 条</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Meeting Card -->
    <div
      class="card row-start-7 row-span-4 col-start-12 col-span-5 mr-4 bg-black/25 rounded-md flex flex-col justify-around items-center hover:shadow-xl duration-200 cursor-default"
    >
      <div class="text-white/60 text-xl font-bold">会议</div>
      <div class="w-3/4 flex justify-around">
        <div>
          <img src="@/assets/images/meeting.png" alt="meeting Icon" />
        </div>
        <div
          class="w-full text-white/60 text-lg ml-4 flex flex-col justify-center"
        >
          <div class="flex justify-between truncate">
            <span>9:00</span>
            <span>开发会议</span>
          </div>
          <div class="flex justify-between truncate">
            <span>14:00</span>
            <span>测试会议</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Todo List Start -->
    <div
      class="row-start-12 row-span-12 col-start-2 col-span-6 mr-4 rounded-md border border-solid border-gray-200 flex flex-col"
    >
      <div
        class="w-full h-1/10 border-b-1 border-b-solid border-gray-200 flex items-center"
      >
        <span class="ml-4 text-lg text-gray-500 font-semibold cursor-default"
          >待办列表</span
        >
      </div>
      <div class="h-9/10 m-3 overflow-auto">
        <template v-for="(item, index) in 6" :key="index">
          <div
            class="w-full h-1/7 hover:bg-green-100 duration-150 rounded-md mb-2 flex"
            @mouseenter="() => (isActive = index)"
            @mouseleave="() => (isActive = -1)"
          >
            <div class="w-5/6 h-full flex items-center">
              <div
                class="w-10 h-10 rounded-lg border border-solid border-gray-200 ml-4 overflow-hidden"
              >
                <img
                  src="@/assets/images/avatar01.png"
                  width="100%"
                  height="100%"
                  alt="avatar"
                />
              </div>
              <div class="ml-2">
                <div class="text-4 font-semibold">Jack</div>
                <div class="text-xs text-gray-500">
                  创建了一个待办，等待你审核
                </div>
              </div>
            </div>
            <div
              class="w-1/6 flex items-center invisible cursor-pointer"
              :class="{ active: isActive === index }"
            >
              处理
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- Todo List End -->

    <!-- chart start -->
    <div
      class="row-start-12 row-span-12 col-start-8 col-span-9 mr-4 rounded-md border border-solid border-gray-200 flex"
    >
      <v-chart ref="barChat" :option="chartOption" autoresize />
    </div>
    <!-- chart end -->

    <!-- Latest News start -->
    <div
      class="row-start-8 row-span-8 col-start-17 col-span-8 mr-4 mt-4 rounded-md border border-solid border-gray-200"
    >
      <div
        class="w-full h-12 border-b-1 border-b-solid border-gray-200 flex items-center"
      >
        <span class="ml-4 text-lg text-gray-500 font-semibold cursor-default"
          >最新动态</span
        >
      </div>
      <div class="w-full h-full flex flex-col px-4">
        <div
          class="w-full h-1/5 border-1 border-solid my-2 border-gray-200 rounded-md flex items-center hover:border-green-600 duration-150 cursor-pointer"
          v-for="(items, index) in 3"
          :key="index"
        >
          <div class="ml-2">
            <VbenAvatar round />
          </div>
          <div class="flex flex-col ml-2">
            <span>威廉在 开源组创建了项目 vue</span>
            <span class="text-xs text-gray-500">刚刚</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Latest News end -->

    <!-- member charts start -->
    <div
      class="row-start-16 row-span-8 col-start-17 col-span-8 mr-4 mt-4 border border-solid border-gray-200 rounded-md"
    >
      <v-chart ref="radarChart" :option="memberOption" autoresize />
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
zu
