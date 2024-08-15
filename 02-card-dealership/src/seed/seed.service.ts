import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedService {

  populateDB(){
    //Cargamos cierto tipo de datos - semilla
    return 'SEED execute';
  }


}
