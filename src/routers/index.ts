import { Routes } from '@nestjs/core';
import { AirDataModule } from './air-data/air-data.module';

const ApiRouteModules = [AirDataModule];

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
