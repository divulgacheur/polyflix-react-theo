import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PolyflixService } from './polyflix.service';
import { PolyflixController } from './polyflix.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PolyflixSchema } from './schemas/polyflix.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Movie', schema: PolyflixSchema }]),
    ], // add this
  providers: [PolyflixService],
  controllers: [PolyflixController],
})
export class PolyflixModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(AuthenticationMiddleware).forRoutes(
        { method: RequestMethod.POST, path: '/polyflix/movie' },
        { method: RequestMethod.PUT, path: '/polyflix/edit' },
        { method: RequestMethod.DELETE, path: '/polyflix/delete' },
      );
    }
}
