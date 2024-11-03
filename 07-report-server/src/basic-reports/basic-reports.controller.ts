import {Controller, Get, Param, Res} from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response} from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get()
  async hello (@Res() response: Response){
    const pdfDoc =     this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title= 'Hola-Mundo'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async getEmploymentLetter(@Res() response: Response){
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title= 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async getEmploymentLetterById(@Res() response: Response, @Param('employeeId') employeeId: string){

    const pdfDoc = await this.basicReportsService.employmentLetterByID(+employeeId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title= 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  //countries
  @Get('countries')
  async getCountries(@Res() response: Response){
    const pdfDoc = await this.basicReportsService.getCountries();

    response.setHeader('content-type', 'application/pdf');
    pdfDoc.info.Title= 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
