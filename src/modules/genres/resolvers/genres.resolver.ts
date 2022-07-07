import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateGenreInput, UpdateGenreInput } from 'src/graphql';
import { IContext } from 'src/types';
import { GenresService } from '../services/genres.service';

@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation('createGenre')
  create(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.genresService.create(createGenreInput, config);
  }

  @Query('genres')
  findAll(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.genresService.findAll(limit, offset);
  }

  @Query('genre')
  findOne(@Args('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Mutation('updateGenre')
  update(
    @Args('id') id: string,
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.genresService.update(id, updateGenreInput, config);
  }

  @Mutation('deleteGenre')
  remove(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.genresService.remove(id, config);
  }
}
