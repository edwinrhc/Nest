import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {getCountryReport, getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';


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

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Edwin HC',
            employerPostion: 'Gerente de RRHH',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartdate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'ErhC code Corp.'
        });
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    async getCountries(){
        const docDefinition = getCountryReport();

        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }
}
