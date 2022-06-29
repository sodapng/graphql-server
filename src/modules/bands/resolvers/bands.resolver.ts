import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BandsService } from '../services/bands.service';

@Resolver('Band')
export class BandsResolver {
  constructor(private readonly bandsService: BandsService) {}

  @Mutation('createBand')
  create(
    @Args('name') name: string,
    @Args('origin') origin: string,
    @Args('members') members: any[],
    @Args('website') website: string,
    @Args('genresIds') genresIds: string[],
  ) {
    return this.bandsService.create(name, origin, members, website, genresIds);
  }

  @Query('bands')
  findAll(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.bandsService.findAll(limit, offset);
  }

  @Query('band')
  findOne(@Args('id') id: string) {
    return this.bandsService.findOne(id);
  }

  @Mutation('updateBand')
  update(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('origin') origin: string,
    @Args('members') members: any[],
    @Args('website') website: string,
    @Args('genresIds') genresIds: string[],
  ) {
    return this.bandsService.update(
      id,
      name,
      origin,
      members,
      website,
      genresIds,
    );
  }

  @Mutation('deleteBand')
  remove(@Args('id') id: string) {
    return this.bandsService.remove(id);
  }
}
