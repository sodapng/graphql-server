import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateArtistInput, UpdateArtistInput } from 'src/graphql';
import { IContext } from 'src/types';
import { ArtistsService } from '../services/artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation('createArtist')
  create(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;

    return this.artistsService.create(createArtistInput, config);
  }

  @Query('artists')
  findAll(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.artistsService.findAll(limit, offset);
  }

  @Query('artist')
  findOne(@Args('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Mutation('updateArtist')
  update(
    @Args('id') id: string,
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;

    return this.artistsService.update(id, updateArtistInput, config);
  }

  @Mutation('deleteArtist')
  remove(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.artistsService.remove(id, config);
  }
}
