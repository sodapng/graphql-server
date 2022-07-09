import { Module } from '@nestjs/common';
import { FavouritesService } from './services/favourites.service';
import { FavouritesResolver } from './resolvers/favourites.resolver';
import { BandsService } from '../bands/services/bands.service';
import { GenresService } from '../genres/services/genres.service';
import { ArtistsService } from '../artists/services/artists.service';
import { TracksService } from '../tracks/services/tracks.service';

@Module({
  providers: [
    FavouritesResolver,
    FavouritesService,
    BandsService,
    GenresService,
    ArtistsService,
    TracksService,
  ],
})
export class FavouritesModule {}
