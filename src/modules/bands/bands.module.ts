import { Module } from '@nestjs/common';
import { BandsService } from './services/bands.service';
import { BandsResolver } from './resolvers/bands.resolver';
import { GenresService } from '../genres/services/genres.service';
import { GenresResolver } from '../genres/resolvers/genres.resolver';

@Module({
  providers: [BandsResolver, BandsService, GenresResolver, GenresService],
})
export class BandsModule {}
