import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from '../helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from '../reports/sections/header.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {
  }

  getHtmlReport(){
    const html = fs.readFileSync('src/reports/html/basic-01.html','utf8');
    console.log(html);

    const content = getHtmlContent(html);

    const docDefinition : TDocumentDefinitions =  {
      pageMargins: [40,110,40,60],
      header : headerSection({
        title:'HTM to PDFMake',
        subTitle: 'Convertir HTML a PDFMake'
      }),
      content: content
    }

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

}
