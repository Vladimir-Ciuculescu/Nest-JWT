import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createArticle(payload: CreateArticleDto) {
    const { title, description, body, published } = payload;

    const article = await this.prismaService.article.create({
      data: { title, description, body, published },
    });

    return article;
  }
}
