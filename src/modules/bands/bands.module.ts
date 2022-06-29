import { Module } from '@nestjs/common';
import { BandsService } from './services/bands.service';
import { BandsResolver } from './resolvers/bands.resolver';

@Module({
  providers: [BandsResolver, BandsService],
})
export class BandsModule {}
