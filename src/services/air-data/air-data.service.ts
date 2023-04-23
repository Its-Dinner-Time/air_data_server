import { Injectable } from '@nestjs/common';
import { AirDataRepository } from './air-data.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { IAirKoreaApiEnvironments } from 'src/configs/environments.config';
import { CITIES, IAIR_DATA } from './air.t';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { AirData } from './air-data.entity';

@Injectable()
export class AirDataService {
  constructor(
    private readonly configService: ConfigService, //
    private readonly dataSource: DataSource, //
    private readonly airDataRepository: AirDataRepository, //
  ) {}

  async getAirDataAll() {
    const airDatas = await this.airDataRepository.getAirDataAll();

    return airDatas //
      .reduce((acc, cur) => this.reduceAirDataByCity(acc, cur), [])
      .map((data) => this.getAverageData(data));
  }

  async getAirDataByCity(city: CITIES) {
    const airDatas = await this.airDataRepository.getAirDatasByCity(city);
    return airDatas //
      .reduce((acc, cur) => this.reduceAirDataByCity(acc, cur), [])
      .map((data) => this.getAverageData(data));
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  updateAirDataFromAirKoreaApi() {
    return this.dataSource.transaction(async () => {
      await this.airDataRepository.deleteAllAirData();

      const cities = Object.values(CITIES);

      const response = await Promise.all(cities.map((city) => this.getAirDataFromAirKoreaApi(city)));

      const flattenResponse = response.flat();

      return this.airDataRepository.insertAirDatas(flattenResponse);
    });
  }

  private async getAirDataFromAirKoreaApi(city: CITIES): Promise<IAIR_DATA[]> {
    const airKoreaEnv = this.configService.get<IAirKoreaApiEnvironments>('airKorea');

    const params = {
      serviceKey: airKoreaEnv.serviceKey,
      returnType: 'json',
      numOfRows: 100,
      pageNo: 1,
      sidoName: city,
      ver: '1.0',
    };

    const response = await axios.get(airKoreaEnv.apiEndpoint, { params });

    const items: IAIR_DATA[] = response.data.response.body.items;
    return items;
  }

  private reduceAirDataByCity(acc: any[], airData: AirData) {
    const index = acc.findIndex((item) => item.sidoName === airData.sidoName);

    if (index === -1) {
      const data = { ...airData, counts: 1 };
      acc.push(data);
      return acc;
    }

    acc[index].khaiGrade = Number(acc[index].khaiGrade) + Number(airData.khaiGrade);
    acc[index].khaiValue = Number(acc[index].khaiValue) + Number(airData.khaiValue);
    acc[index].coGrade = Number(acc[index].coGrade) + Number(airData.coGrade);
    acc[index].coValue = Number(acc[index].coValue) + Number(airData.coValue);
    acc[index].no2Grade = Number(acc[index].no2Grade) + Number(airData.no2Grade);
    acc[index].no2Value = Number(acc[index].no2Value) + Number(airData.no2Value);
    acc[index].o3Grade = Number(acc[index].o3Grade) + Number(airData.o3Grade);
    acc[index].o3Value = Number(acc[index].o3Value) + Number(airData.o3Value);
    acc[index].pm10Grade = Number(acc[index].pm10Grade) + Number(airData.pm10Grade);
    acc[index].pm10Value = Number(acc[index].pm10Value) + Number(airData.pm10Value);
    acc[index].pm25Grade = Number(acc[index].pm25Grade) + Number(airData.pm25Grade);
    acc[index].pm25Value = Number(acc[index].pm25Value) + Number(airData.pm25Value);
    acc[index].so2Grade = Number(acc[index].so2Grade) + Number(airData.so2Grade);
    acc[index].so2Value = Number(acc[index].so2Value) + Number(airData.so2Value);
    acc[index].counts += 1;
    return acc;
  }

  private getAverageData(airData: any) {
    airData.khaiGrade = this.calculateAverage(airData.khaiGrade, airData.counts);
    airData.khaiValue = this.calculateAverage(airData.khaiValue, airData.counts);
    airData.coGrade = this.calculateAverage(airData.coGrade, airData.counts);
    airData.coValue = this.calculateAverage(airData.coValue, airData.counts, true);
    airData.no2Grade = this.calculateAverage(airData.no2Grade, airData.counts);
    airData.no2Value = this.calculateAverage(airData.no2Value, airData.counts, true);
    airData.o3Grade = this.calculateAverage(airData.o3Grade, airData.counts);
    airData.o3Value = this.calculateAverage(airData.o3Value, airData.counts, true);
    airData.pm10Grade = this.calculateAverage(airData.pm10Grade, airData.counts);
    airData.pm10Value = this.calculateAverage(airData.pm10Value, airData.counts);
    airData.pm25Grade = this.calculateAverage(airData.pm25Grade, airData.counts);
    airData.pm25Value = this.calculateAverage(airData.pm25Value, airData.counts);
    airData.so2Grade = this.calculateAverage(airData.so2Grade, airData.counts);
    airData.so2Value = this.calculateAverage(airData.so2Value, airData.counts, true);

    delete airData.stationName;
    delete airData.counts;
    return airData;
  }

  private calculateAverage(value: number, count: number, isDecimal?: boolean): number {
    if (!isDecimal) return Math.round(Number(value) / Number(count));

    const multiplier: number = Math.pow(10, 3);
    return Math.round((Number(value) / Number(count)) * multiplier) / multiplier;
  }
}
