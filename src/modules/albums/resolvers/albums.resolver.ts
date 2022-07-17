import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Album, CreateAlbumInput, UpdateAlbumInput } from 'src/graphql';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { IContext } from 'src/types';
import { AlbumsService } from '../services/albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Resolver()
  @ResolveField()
  async tracks(@Parent() album: Album & { trackIds: string[] }) {
    const { trackIds } = album;
    return trackIds.map((trackId) => this.tracksService.findOne(trackId));
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() album: Album & { artistsIds: string[] }) {
    const { artistsIds } = album;
    return artistsIds.map((artistId) => this.artistsService.findOne(artistId));
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() album: Album & { bandsIds: string[] }) {
    const { bandsIds } = album;
    return bandsIds.map((bandId) => this.bandsService.findOne(bandId));
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() album: Album & { genresIds: string[] }) {
    const { genresIds } = album;
    return genresIds.map((genreId) => this.genresService.findOne(genreId));
  }

  @Mutation('createAlbum')
  create(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.albumsService.create(createAlbumInput, config);
  }

  @Query('albums')
  findAll(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.albumsService.findAll(limit, offset);
  }

  @Query('album')
  findOne(@Args('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Mutation('updateAlbum')
  update(
    @Args('id') id: string,
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.albumsService.update(id, updateAlbumInput, config);
  }

  @Mutation('deleteAlbum')
  remove(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.albumsService.remove(id, config);
  }
}
