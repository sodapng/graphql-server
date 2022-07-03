import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateTrackInput, UpdateTrackInput } from 'src/graphql';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { IContext } from 'src/types';
import { TracksService } from '../services/tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private bandsService: BandsService,
    private genresService: GenresService,
  ) {}

  @ResolveField('bands')
  async posts(@Parent() author) {
    console.log(author);
    // const { id } = author;
    // return this.bandsService.findOne(id);
  }

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
