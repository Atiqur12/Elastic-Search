import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticSearch.service';

@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}