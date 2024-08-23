import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";



@Schema()
export class Guerreros extends Document{

    @Prop({
        unique:true,
        index:true
    })
    name: string;

    
    @Prop({
        index:true
    })
    race: string;
}

export const GuerrerosSchema = SchemaFactory.createForClass(Guerreros);