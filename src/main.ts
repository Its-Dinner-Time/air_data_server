import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { IEnvironmentConfigs } from './configs/environments.config';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의 되지 않은 값은 받지 않음
      forbidUnknownValues: false, // dto에 class validator가 적용되지 않아도 실행 가능하도록

      // custom vaildation error filter
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const error = validationErrors[0];
        const message = `${error.property}: ${Object.values(error.constraints)[0]}`;
        return new BadRequestException(message, { description: 'DTO ERROR' });
      },
    }),
  );

  app.enableCors();

  const configService = app.get(ConfigService<IEnvironmentConfigs>);
  const PORT = configService.getOrThrow('port');

  await app.listen(PORT);
}
bootstrap();
