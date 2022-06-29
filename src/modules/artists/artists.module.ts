import { Module } from '@nestjs/common';
import { ArtistsService } from './services/artists.service';
import { ArtistsResolver } from './resolvers/artists.resolver';

@Module({
  providers: [ArtistsResolver, ArtistsService],
})
export class ArtistsModule {}
