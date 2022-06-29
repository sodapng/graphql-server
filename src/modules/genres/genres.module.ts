import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { GenresResolver } from './resolvers/genres.resolver';

@Module({
  providers: [GenresResolver, GenresService],
})
export class GenresModule {}
