import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Band, CreateBandInput, UpdateBandInput } from 'src/graphql';
import { GenresService } from 'src/modules/genres/services/genres.service';
import { IContext } from 'src/types';
import { BandsService } from '../services/bands.service';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Resolver()
  @ResolveField()
  async genres(@Parent() band: Band & { genresIds: string[] }) {
    const { genresIds } = band;
    return genresIds.map((genreId) => this.genresService.findOne(genreId));
  }

  @Mutation('createBand')
  create(
    @Args('createBandInput') createBandInput: CreateBandInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.bandsService.create(createBandInput, config);
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
    @Args('updateBandInput') updateBandInput: UpdateBandInput,
    @Context() ctx: IContext,
  ) {
    const { config } = ctx;
    return this.bandsService.update(id, updateBandInput, config);
  }

  @Mutation('deleteBand')
  remove(@Args('id') id: string, @Context() ctx: IContext) {
    const { config } = ctx;
    return this.bandsService.remove(id, config);
  }
}
