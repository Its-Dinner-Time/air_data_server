import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';

export interface IGraphqlEnvironments {
  typepaths: string[];
}

const graphqlConfig: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const graphql = config.getOrThrow<IGraphqlEnvironments>('graphql');

    return {
      typePaths: graphql.typepaths,
    };
  },
};

export default graphqlConfig;
