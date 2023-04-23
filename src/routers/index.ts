import { Routes } from '@nestjs/core';

const ApiRouteModules = [];

const routes: Routes = [
  {
    path: '/api',
    children: ApiRouteModules,
  },
];

export const RouteModules = [
  ...ApiRouteModules, //
];

export default routes;
