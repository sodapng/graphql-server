import { Module } from '@nestjs/common';
import { BandsService } from './services/bands.service';
import { BandsResolver } from './resolvers/bands.resolver';
import { GenresService } from '../genres/services/genres.service';
import { ArtistsService } from '../artists/services/artists.service';

@Module({
  providers: [BandsResolver, BandsService, GenresService, ArtistsService],
})
export class BandsModule {}
