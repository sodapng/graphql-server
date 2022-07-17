import { Module } from '@nestjs/common';
import { ArtistsService } from './services/artists.service';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { BandsResolver } from '../bands/resolvers/bands.resolver';
import { BandsService } from '../bands/services/bands.service';
import { GenresResolver } from '../genres/resolvers/genres.resolver';
import { GenresService } from '../genres/services/genres.service';

@Module({
  providers: [
    ArtistsResolver,
    ArtistsService,
    BandsResolver,
    BandsService,
    GenresResolver,
    GenresService,
  ],
})
export class ArtistsModule {}
