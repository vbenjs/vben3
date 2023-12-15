import { loadRoutesFromModules } from '@vben/utils';
import { RouteRecordRaw } from 'vue-router';

const routeModuleRecord = import.meta.globEager('./modules/**/*.ts') as any
const routeModules: RouteRecordRaw[] = loadRoutesFromModules(routeModuleRecord);

export const asyncRoutes = [...routeModules]
