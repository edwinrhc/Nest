import { Injectable } from '@nestjs/common';
import { getHelloWorldReport } from '../reports';
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {
  }

  getHtmlReport(){
    const docDefinition = getHelloWorldReport({
    name : 'Edwin HC'
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

}
