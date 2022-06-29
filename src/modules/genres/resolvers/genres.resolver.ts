import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GenresService } from '../services/genres.service';

@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation('createGenre')
  create(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('country') country: string,
    @Args('year') year: number,
  ) {
    return this.genresService.create(name, description, country, year);
  }

  @Query('genres')
  findAll() {
    return this.genresService.findAll();
  }

  @Query('genre')
  findOne(@Args('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Mutation('updateGenre')
  update(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('country') country: string,
    @Args('year') year: number,
  ) {
    return this.genresService.update(id, name, description, country, year);
  }

  @Mutation('deleteGenre')
  remove(@Args('id') id: string) {
    return this.genresService.remove(id);
  }
}
