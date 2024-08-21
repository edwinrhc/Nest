import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {isValidObjectId} from "mongoose";

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {


  transform(value: string, metadata: ArgumentMetadata) {

    //console.log({value, metadata});
    if(!isValidObjectId(value)){ // Aqui se segura que todos sea mongo ID
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
