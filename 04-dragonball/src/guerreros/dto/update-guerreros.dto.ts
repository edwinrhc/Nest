import { PartialType } from '@nestjs/mapped-types';
import {CreateGuerrerosDto} from "./create-guerreros.dto";


export class UpdateGuerrerosDto  extends PartialType(CreateGuerrerosDto){

}