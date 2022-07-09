import { Module } from '@nestjs/common';
import { AlbumsService } from './services/albums.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { TracksResolver } from '../tracks/resolvers/tracks.resolver';
import { TracksService } from '../tracks/services/tracks.service';
import { ArtistsResolver } from '../artists/resolvers/artists.resolver';
import { ArtistsService } from '../artists/services/artists.service';
import { BandsResolver } from '../bands/resolvers/bands.resolver';
import { BandsService } from '../bands/services/bands.service';
import { GenresResolver } from '../genres/resolvers/genres.resolver';
import { GenresService } from '../genres/services/genres.service';

@Module({
  providers: [
    AlbumsResolver,
    AlbumsService,
    TracksResolver,
    TracksService,
    ArtistsResolver,
    ArtistsService,
    BandsResolver,
    BandsService,
    GenresResolver,
    GenresService,
  ],
})
export class AlbumsModule {}
