import {Controller, Get, Param} from '@nestjs/common';

@Controller('cars')
export class CarsController {


    private cars = ['Toyota','Nissan','Jeep'];

    @Get()
    getAllCars(){
        return this.cars;
    }

    @Get(':id')
    getCarById(@Param('id') id:string){
        console.log(this.cars[id]);
        return this.cars[id];
    }
}
