import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateTrackInput, Track, UpdateTrackInput } from 'src/graphql';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { IContext } from 'src/types';
import { TracksService } from '../services/tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Resolver()
  @ResolveField()
  async album(@Parent() track: Track & { albumId: string }) {
    const { albumId } = track;
    return this.albumsService.findOne(albumId);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() track: Track & { artistsIds: string[] }) {
    const { artistsIds } = track;
    return artistsIds.map((artistId) => this.artistsService.findOne(artistId));
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() track: Track & { bandsIds: string[] }) {
    const { bandsIds } = track;
    return bandsIds.map((bandId) => this.bandsService.findOne(bandId));
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() track: Track & { genresIds: string[] }) {
    const { genresIds } = track;
    return genresIds.map((genreId) => this.genresService.findOne(genreId));
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
