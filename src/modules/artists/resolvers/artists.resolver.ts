import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation('createArtist')
  create(
    @Args('firstName') firstName: string,
    @Args('secondName') secondName: string,
    @Args('middleName') middleName: string,
    @Args('birthDate') birthDate: string,
    @Args('birthPlace') birthPlace: string,
    @Args('country') country: string,
    @Args('bands') bands: string[],
    @Args('instruments') instruments: string[],
  ) {
    return this.artistsService.create(
      firstName,
      secondName,
      middleName,
      birthDate,
      birthPlace,
      country,
      bands,
      instruments,
    );
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
    @Args('firstName') firstName: string,
    @Args('secondName') secondName: string,
    @Args('middleName') middleName: string,
    @Args('birthDate') birthDate: string,
    @Args('birthPlace') birthPlace: string,
    @Args('country') country: string,
    @Args('bands') bands: string[],
    @Args('instruments') instruments: string[],
  ) {
    return this.artistsService.update(
      id,
      firstName,
      secondName,
      middleName,
      birthDate,
      birthPlace,
      country,
      bands,
      instruments,
    );
  }

  @Mutation('deleteArtist')
  remove(@Args('id') id: string) {
    return this.artistsService.remove(id);
  }
}
