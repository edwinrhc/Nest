import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { GuerrerosService } from './guerreros.service';
import {CreateGuerrerosDto} from "./dto/create-guerreros.dto";
import {PaginationDto} from "../common/dto/PaginationDto.dto";

@Controller('guerreros')
export class GuerrerosController {

  constructor(
    private readonly sayayinesService: GuerrerosService
  ) {
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.sayayinesService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createSayayinesDto: CreateGuerrerosDto){
    return this.sayayinesService.create(createSayayinesDto);
  }

  @Get(':term')
  findOne(@Param('term') term:string){
    return this.sayayinesService.findOne(term);
  }




}
