import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'src/prisma.service';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ArticlesService, PrismaService, JwtService],
  controllers: [ArticlesController],
})
export class ArticlesModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*');
  // }
}
