import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {isValidObjectId, Model} from "mongoose";
import {Guerreros} from "./entities/guerreros.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CreateGuerrerosDto} from "./dto/create-guerreros.dto";
import {PaginationDto} from "../common/dto/PaginationDto.dto";
import {UpdateGuerrerosDto} from "./dto/update-guerreros.dto";

@Injectable()
export class GuerrerosService {

  constructor(
      @InjectModel(Guerreros.name)
      private readonly guerrerosModel: Model<Guerreros>
  ) {}

  async create(createSayayinesDto: CreateGuerrerosDto) {
    createSayayinesDto.name = createSayayinesDto.name.toLowerCase();
    try {
      const guerreros = await this.guerrerosModel.create(createSayayinesDto);
      return guerreros;
    } catch(error){
      this.handExceptions(error);
    }
  }

  async findOne(term: string)
  {
    let personaje: Guerreros;
    if(!isNaN(+term)){
      personaje = await this.guerrerosModel.findOne({race:term});
    }
    // Verificamos por MongoID
    if(!personaje && isValidObjectId(term)){
      personaje = await this.guerrerosModel.findById(term);
    }
    //Name
    if(!personaje){
      personaje = await this.guerrerosModel.findOne({name:term.toLowerCase().trim()});
    }
    if(!personaje){
      throw new NotFoundException(`Sayayin with ID, name or no "${term} not found`);
    }

    return personaje

  }




  findAll(paginationDto: PaginationDto){

    const { limit = 5, offset= 0} = paginationDto;

    return this.guerrerosModel.find()
        .limit(limit)
        .skip(offset)
        .select('-__v');
  }


  async update(term: string, updateGuerreroDto: UpdateGuerrerosDto){
    const guerrero = await this.findOne(term);
    if(updateGuerreroDto.name){
        updateGuerreroDto.name = updateGuerreroDto.name.toLowerCase();
    }
    try{
      await guerrero.updateOne(updateGuerreroDto);
    }catch (error){
      this.handExceptions(error);
    }
  }

  async remove(id: string){
    const {deletedCount}  = await this.guerrerosModel.deleteOne({_id: id});
    if(deletedCount === 0){
      throw new BadRequestException(`Guerreros deleted, id ${id} not found`);
    }
    return { message: `Guerrero with ID ${id} was successfully deleted` };
  }


  private handExceptions(error:any){
    if(error.code ===11000){
      throw new BadRequestException(`Sayayin exists in db ${JSON.stringify(error.keyValue())}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Sayayin - Check servers logs`);
  }



}
