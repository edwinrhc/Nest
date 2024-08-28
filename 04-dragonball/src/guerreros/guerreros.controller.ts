import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { GuerrerosService } from './guerreros.service';
import {CreateGuerrerosDto} from "./dto/create-guerreros.dto";
import {PaginationDto} from "../common/dto/PaginationDto.dto";
import {UpdateGuerrerosDto} from "./dto/update-guerreros.dto";
import {ParseMongoIdPipe} from "../common/pipes/parse-mongo-id/parse-mongo-id.pipe";

@Controller('guerreros')
export class GuerrerosController {

  constructor(
    private readonly guerrerosService: GuerrerosService
  ) {
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.guerrerosService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createGuerreroDto: CreateGuerrerosDto){
    return this.guerrerosService.create(createGuerreroDto);
  }

  @Get(':term')
  findOne(@Param('term') term:string){
    return this.guerrerosService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateGuerrerosDto: UpdateGuerrerosDto){
    return this.guerrerosService.update(term,updateGuerrerosDto);
  }


  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string){
    return this.guerrerosService.remove(id);
  }




}
