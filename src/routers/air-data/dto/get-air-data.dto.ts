import { IsIn, IsNotEmpty } from 'class-validator';
import { CITIES } from 'src/services/air-data/air.t';

export class GetAirDataDTO {
  @IsNotEmpty()
  @IsIn(Object.values(CITIES))
  city: CITIES;
}
