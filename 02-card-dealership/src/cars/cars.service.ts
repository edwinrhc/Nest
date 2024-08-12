import {Injectable, NotFoundException} from '@nestjs/common';
import {NotFoundError} from "rxjs";
import {Car} from "./interfaces/car.interface";
import {v4 as uuid} from 'uuid';
import {CreateCarDto,UpdateCarDto} from "./dto/index.dto";




@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found'`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);

        return newCar;
    }

    update(id: string,updateCarDto: UpdateCarDto) {

        let carDB = this.findOneById(id);

        if(updateCarDto.id  &&  updateCarDto.id !== id){
            throw new NotFoundException(`Car with id '${id}' not found`);
        }
        this.cars = this.cars.map( car => {
            if(car.id === id){
                carDB = { ...carDB, ...updateCarDto,  id }
                return carDB;
            }
            return car;
        })
        return carDB ; // carro actualizado

    }


    delete ( id:string): Car{
        // const carIndex = this.findOneById(id);
        const carIndex = this.cars.findIndex(car => car.id === id);
       if(carIndex === -1){
           throw new NotFoundException(`Car with ID '${id}' not found`)
       }
       const deletedCar = this.cars[carIndex];
       this.cars.splice(carIndex,1);
        return deletedCar;
    }

}
