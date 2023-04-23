import { Controller, Get, Query } from '@nestjs/common';
import { AirDataService } from 'src/services/air-data/air-data.service';
import { GetAirDataDTO } from './dto/get-air-data.dto';

@Controller('air-data')
export class AirDataController {
  constructor(
    private readonly airDataService: AirDataService, //
  ) {}

  @Get('all')
  getAirData() {
    return this.airDataService.getAirDataAll();
  }

  @Get('')
  getAirDataByCity(@Query() getAirDataDTO: GetAirDataDTO) {
    return this.airDataService.getAirDataByCity(getAirDataDTO.city);
  }
}
