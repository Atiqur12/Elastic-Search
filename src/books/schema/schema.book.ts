import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type BookDocument = Book & Document

@Schema({timestamps:true})

export class Book {

    @Prop({required: true, type: String})
    title

    @Prop({required: true, type: String})
    author

    @Prop({required: true, type: String})
    description

    @Prop({required: false, type: String})
    genre
}

export const BookSchema  = SchemaFactory.createForClass(Book)
