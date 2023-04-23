import { IGraphqlEnvironments } from './graphql.config';
import { ITypeormEnvironments } from './typeorm.config';

export interface IEnvironmentConfigs {
  port: number;
  database: ITypeormEnvironments;
  graphql: IGraphqlEnvironments;
}

const environments = (): IEnvironmentConfigs => {
  return {
    port: parseInt(process.env.PORT, 10),
    database: {
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
    },
    graphql: {
      typepaths: process.env.GRAPHQL_TYPE_PATHS.split(
        process.env.GRAPHQL_TYPE_PATH_SEP || ' ',
      ),
    },
  };
};

const environmentConfig = {
  envFilePath: ['.env', '.env.development', '.env.production'],
  load: [environments], //
};

export default environmentConfig;
