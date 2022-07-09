import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { GenresModule } from './modules/genres/genres.module';
import { BandsModule } from './modules/bands/bands.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavouritesModule } from './modules/favourites/favourites.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => {
        const token: string = req.headers.authorization || '';

        return {
          config: {
            headers: {
              Authorization: token,
            },
          },
        };
      },
    }),
    UsersModule,
    GenresModule,
    BandsModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavouritesModule,
  ],
})
export class AppModule {}
