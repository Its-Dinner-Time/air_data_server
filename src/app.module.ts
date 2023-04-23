import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';

import routes, { RouteModules } from './routers';
import { environmentConfig, typeormConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    TypeOrmModule.forRootAsync(typeormConfig),
    RouterModule.register(routes),
    ...RouteModules,
  ],
})
export class AppModule {}
