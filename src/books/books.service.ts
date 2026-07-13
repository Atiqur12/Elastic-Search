import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from './schema/schema.book';
import { ElasticsearchService } from '../../elasticSearch/elasticSearch.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModule: Model<BookDocument>,
    private elasticSearch : ElasticsearchService
  ) { }
  async create(createBookDto: CreateBookDto) {
    const create = new this.bookModule(createBookDto)
    const saved  = await create.save()
    await this.elasticSearch.indexBook(saved) 
    return saved
  }

  async findAll() {

    return await this.bookModule.find().exec()
  }

  async findOne(id: string) {
    const exist = await this.bookModule.findById(id).exec();
    if (!exist) {
      throw new NotFoundException('No book records found')
    } else {
      return exist
    }

  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const exist = await this.bookModule.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();

    if (!exist) {
      throw new NotFoundException('No book records found for update')
    } else {
      return exist
    }

  }


  async remove(id: string) {
    const exist = await this.bookModule.findByIdAndDelete(id).exec();

    if (!exist) {
      throw new NotFoundException('No book records found for deletion')
    } else {
      return exist
    }

  }

  async search(query: string) {
    return this.elasticSearch.searchBooks(query);
  }
}
