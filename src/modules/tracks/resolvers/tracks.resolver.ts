import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateTrackInput, UpdateTrackInput } from 'src/graphql';
import { IContext } from 'src/types';
import { TracksService } from '../services/tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Mutation('createTrack')
  create(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.tracksService.create(createTrackInput, config);
  }

  @Query('tracks')
  findAll(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.tracksService.findAll(limit, offset);
  }

  @Query('track')
  findOne(@Args('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Mutation('updateTrack')
  update(
    @Args('id') id: string,
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.tracksService.update(id, updateTrackInput, config);
  }

  @Mutation('deleteTrack')
  remove(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.tracksService.remove(id, config);
  }
}
