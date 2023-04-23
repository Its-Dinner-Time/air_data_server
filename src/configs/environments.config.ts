import { ITypeormEnvironments } from './typeorm.config';

export interface IAirKoreaApiEnvironments {
  serviceKey: string;
  apiEndpoint: string;
}

export interface IEnvironmentConfigs {
  port: number;
  database: ITypeormEnvironments;
  airKorea: IAirKoreaApiEnvironments;
}

const environments = (): IEnvironmentConfigs => {
  return {
    port: parseInt(process.env.PORT, 10),
    database: {
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST || '',
      username: process.env.DATABASE_USERNAME || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_DATABASE || '',
    },
    airKorea: {
      apiEndpoint: process.env.AIR_KOREA_API_ENDPOINT || '',
      serviceKey: process.env.AIR_KOREA_SERVICE_KEY || '',
    },
  };
};

const environmentConfig = {
  envFilePath: ['.env', '.env.development', '.env.production'],
  load: [environments], //
};

export default environmentConfig;
