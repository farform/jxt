import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
// const modules = import.meta.globEager('./modules/**/*.ts');
const modules = import.meta.globEager('./modules/*.ts');
// const demos = import.meta.globEager('./modules/demo/**/*.ts');
const customer = import.meta.globEager('./modules/jxt/customer.ts');
const charge = import.meta.globEager('./modules/jxt/charge.ts');
const coach = import.meta.globEager('./modules/jxt/coach.ts');
const system = import.meta.globEager('./modules/jxt/system.ts');
const student = import.meta.globEager('./modules/jxt/student.ts');
const exam = import.meta.globEager('./modules/jxt/exam.ts');
const car = import.meta.globEager('./modules/jxt/vehicle.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
const insetRouteModuleList = (modules) => {
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });
};
insetRouteModuleList(modules);
// insetRouteModuleList(demos);
insetRouteModuleList(customer);
insetRouteModuleList(charge);
insetRouteModuleList(coach);
insetRouteModuleList(student);
insetRouteModuleList(exam);
insetRouteModuleList(car);
insetRouteModuleList(system);

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
