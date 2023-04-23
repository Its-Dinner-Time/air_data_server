import { ITypeormEnvironments } from './typeorm.config';

export interface IEnvironmentConfigs {
  port: number;
  database: ITypeormEnvironments;
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
  };
};

const environmentConfig = {
  envFilePath: ['.env', '.env.development', '.env.production'],
  load: [environments], //
};

export default environmentConfig;
