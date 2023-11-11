import {LAYOUT} from '@vben/router/src/routes/basic'

const dashboard: RouteRecordItem = {
    path: '/order',
    name: 'order_index',
    redirect: '/order/index',
    component: LAYOUT,
    meta: {
        orderNo: 1,
        icon: 'mdi:monitor-dashboard',
        title: 'routes.order.index',
        root: true,
    },
    children: [
        {
            path: 'index',
            name: 'order_order',
            component: () => import('@/pages/order/order/index.vue'),
            meta: {
                icon: 'icon-park-outline:analysis',
                title: 'routes.order.order',
            },
        },
        {
            path: 'types',
            name: 'types',
            component: () => import('@/pages/order/types/index.vue'),
            meta: {
                icon: 'icon-park-outline:workbench',
                title: 'routes.order.types',
            },
        },
    ],
}

export default dashboard
