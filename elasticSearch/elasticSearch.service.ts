import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly client = new Client({ node: 'http://localhost:9200' });

  async indexBook(book: any) {
    return this.client.index({
      index: 'books',
      id: book._id.toString(),
      document: {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
      },
    });
  }

  async searchBooks(query: string) {
    const result = await this.client.search({
      index: 'books',
      query: {
        multi_match: {
          query: query,
          fields: ['title', 'author', 'description'],
        },
      }
    });
    return result.hits.hits;
  }
};