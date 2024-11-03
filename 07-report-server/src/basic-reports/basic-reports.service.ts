import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {


    async onModuleInit() {
        await this.$connect();
        // console.log('Connected to the database');
    }

    constructor(private readonly printerService: PrinterService) {
        super(); // aqui inicializamos
    }

    hello() {

        const docDefinition = getHelloWorldReport({
            name:'Edwin HC'
        });
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    employmentLetter(){
        const docDefinition = getEmploymentLetterReport();
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    async employmentLetterByID(employeeId: number){

        const employee = await this.employees.findUnique({
            where: {
                id: employeeId
            }
        });
        console.log(employee);

        if(!employee){
            throw new NotFoundException(`Employee with id ${employeeId} not found`);
        }

        const docDefinition = getEmploymentLetterReport();
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }
}
