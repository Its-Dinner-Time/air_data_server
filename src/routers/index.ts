import { Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';

const ApiRouteModules = [UserModule];

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
