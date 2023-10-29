import {LAYOUT} from '../../basic'

const charts: RouteRecordItem = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: 'routes.demo.charts.charts',
  },
  children: [
    {
      path: 'baiduMap',
      name: 'BaiduMap',
      meta: {
        title: 'routes.demo.charts.baiduMap',
      },
      component: () => import('@/pages/demo/charts/map/Baidu.vue'),
    },
    {
      path: 'aMap',
      name: 'AMap',
      meta: {
        title: 'routes.demo.charts.aMap',
      },
      component: () => import('@/pages/demo/charts/map/Gaode.vue'),
    },
    {
      path: 'googleMap',
      name: 'GoogleMap',
      meta: {
        title: 'routes.demo.charts.googleMap',
      },
      component: () => import('@/pages/demo/charts/map/Google.vue'),
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: LAYOUT,
      meta: {
        title: 'Echarts',
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/pages/demo/charts/Map.vue'),
          meta: {
            title: 'routes.demo.charts.map',
          },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('@/pages/demo/charts/Line.vue'),
          meta: {
            title: 'routes.demo.charts.line',
          },
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('@/pages/demo/charts/Pie.vue'),
          meta: {
            title: 'routes.demo.charts.pie',
          },
        },
      ],
    },
  ],
};

export default charts;
