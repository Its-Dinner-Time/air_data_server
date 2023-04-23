import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirData } from 'src/services/air-data/air-data.entity';
import { AirDataRepository } from 'src/services/air-data/air-data.repository';
import { AirDataService } from 'src/services/air-data/air-data.service';
import { AirDataController } from './air-data.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([AirData]), //
  ],
  providers: [
    ConfigService,
    AirDataRepository, //
    AirDataService,
  ],
  controllers: [AirDataController],
})
export class AirDataModule {}
