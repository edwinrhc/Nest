import {Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post} from '@nestjs/common';
import {CarsService} from "./cars.service";

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService) {
    }


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(@Body() body: any) {
        return body;
    }

    @Patch(':id')
    updateCar(@Param('id', new ParseUUIDPipe({version:'4'})) id: number, @Body() body: any) {
        return body;
    }

    @Delete(':id')
    deleteCar(@Param('id', new ParseUUIDPipe({version:'4'})) id: number) {
        return {
            method: 'DELETE',
            id: Number(id)
        }
    }
}
