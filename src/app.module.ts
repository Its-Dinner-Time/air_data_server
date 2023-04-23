import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';

import routes, { RouteModules } from './routers';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { environmentConfig, graphqlConfig, typeormConfig } from './configs';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphqlConfig),
    TypeOrmModule.forRootAsync(typeormConfig),
    RouterModule.register(routes),
    ...RouteModules,
    GraphqlModule,
  ],
})
export class AppModule {}
