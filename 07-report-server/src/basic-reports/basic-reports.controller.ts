import {Controller, Get, Res} from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response} from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get()
  hello (@Res() response: Response){
    const pdfDoc =     this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title= 'Hola-Mundo'
    pdfDoc.pipe(response);
    pdfDoc.end();

  }
}
