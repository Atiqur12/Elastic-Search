import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Book, BookSchema} from './schema/schema.book'
import { ElasticsearchModule } from 'elasticSearch/elasricsearch.module';
@Module({
  imports: [MongooseModule.forFeature([{name : Book.name, schema: BookSchema}]),
ElasticsearchModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
