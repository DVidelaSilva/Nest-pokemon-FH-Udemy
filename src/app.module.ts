import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './configs/env.config';
import { JoiValidationSchema } from './configs/joi.validation';


@Module({
  imports: [

    ConfigModule.forRoot({   // Siempre arriba de todos
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }), 

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

      MongooseModule.forRoot(process.env.MONGODB, {
        dbName: 'pokemondb'
      }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],

})
export class AppModule {}
