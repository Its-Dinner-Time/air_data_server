import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirData } from './air-data.entity';
import { Repository } from 'typeorm';
import { CITIES, IAIR_DATA } from './air.t';

@Injectable()
export class AirDataRepository {
  constructor(
    @InjectRepository(AirData)
    private readonly airDataRepository: Repository<AirData>, //
  ) {}

  insertAirDatas(airDatas: IAIR_DATA[]) {
    return this.airDataRepository.insert(airDatas);
  }

  deleteAllAirData() {
    return this.airDataRepository.createQueryBuilder().delete().execute();
  }

  getAirDataAll() {
    return this.airDataRepository.find();
  }

  getAirDatasByCity(city: CITIES) {
    return this.airDataRepository.findBy({ sidoName: city });
  }
}
