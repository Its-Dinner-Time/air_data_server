import { ConfigModule, ConfigService } from '@nestjs/config';
import { IEnvironmentConfigs } from './environments.config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export interface ITypeormEnvironments {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService<IEnvironmentConfigs>) => {
    const database = config.getOrThrow<ITypeormEnvironments>('database');

    return {
      type: 'mysql',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      entities: ['dist/**/*.entity{.js}'],
      subscribers: ['dist/**/*.subscriber{.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    };
  },
};

export default typeormConfig;
