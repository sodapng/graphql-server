import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Favourites } from 'src/graphql';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { BandsService } from 'src/modules/bands/services/bands.service';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { IContext } from 'src/types';
import { FavouritesService } from '../services/favourites.service';

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Resolver()
  @ResolveField()
  async tracks(@Parent() favourites: Favourites & { tracksIds: string[] }) {
    const { tracksIds } = favourites;
    return tracksIds.map((trackId) => this.tracksService.findOne(trackId));
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() favourites: Favourites & { artistsIds: string[] }) {
    const { artistsIds } = favourites;
    return artistsIds.map((artistId) => this.artistsService.findOne(artistId));
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() favourites: Favourites & { bandsIds: string[] }) {
    const { bandsIds } = favourites;
    return bandsIds.map((bandId) => this.bandsService.findOne(bandId));
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() favourites: Favourites & { genresIds: string[] }) {
    const { genresIds } = favourites;
    return genresIds.map((genreId) => this.genresService.findOne(genreId));
  }

  @Mutation('addTrackToFavourites')
  addTrackToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.add('tracks', id, config);
  }

  @Mutation('addBandToFavourites')
  addBandToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.add('bands', id, config);
  }

  @Mutation('addArtistToFavourites')
  addArtistToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.add('artists', id, config);
  }

  @Mutation('addGenreToFavourites')
  addGenreToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.add('genres', id, config);
  }

  @Mutation('removeTrackToFavourites')
  removeTrackToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.remove('tracks', id, config);
  }

  @Mutation('removeBandToFavourites')
  removeBandToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.remove('bands', id, config);
  }

  @Mutation('removeArtistToFavourites')
  removeArtistToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.remove('artists', id, config);
  }

  @Mutation('removeGenreToFavourites')
  removeGenreToFavourites(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.remove('genres', id, config);
  }

  @Query('favourites')
  findAll(@Context() ctx: IContext) {
    const { config } = ctx;
    return this.favouritesService.findAll(config);
  }
}
