import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {

    constructor(
        private readonly printerService: PrinterService) {
    }

   async getOrderByIdReport(orderId: string) {
        const docDefinition =  orderByIdReport();
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

}
