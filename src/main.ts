import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { IEnvironmentConfigs } from './configs/environments.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<IEnvironmentConfigs>);
  const PORT = configService.getOrThrow('port');

  await app.listen(PORT);
}
bootstrap();
