import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksResolver } from './resolvers/tracks.resolver';
import { ArtistsService } from '../artists/services/artists.service';
import { ArtistsResolver } from '../artists/resolvers/artists.resolver';
import { BandsResolver } from '../bands/resolvers/bands.resolver';
import { BandsService } from '../bands/services/bands.service';
import { GenresResolver } from '../genres/resolvers/genres.resolver';
import { GenresService } from '../genres/services/genres.service';
import { AlbumsResolver } from '../albums/resolvers/albums.resolver';
import { AlbumsService } from '../albums/services/albums.service';

@Module({
  providers: [
    TracksResolver,
    TracksService,
    ArtistsResolver,
    ArtistsService,
    BandsResolver,
    BandsService,
    GenresResolver,
    GenresService,
    AlbumsResolver,
    AlbumsService,
  ],
})
export class TracksModule {}
