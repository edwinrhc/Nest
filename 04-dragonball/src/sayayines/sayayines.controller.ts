import { Controller, Get } from '@nestjs/common';
import { SayayinesService } from './sayayines.service';

@Controller('sayayines')
export class SayayinesController {

  constructor(
    private readonly sayayinesService: SayayinesService
  ) {
  }

  @Get()
  findAll(){
    return this.sayayinesService.findAll();
  }


}
