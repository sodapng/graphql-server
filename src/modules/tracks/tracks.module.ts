import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksResolver } from './resolvers/tracks.resolver';

@Module({
  providers: [TracksResolver, TracksService],
})
export class TracksModule {}
