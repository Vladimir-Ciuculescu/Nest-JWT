import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesDto } from './dtos/get-articles.dto';
import { UserRequestDto } from 'src/users/dtos/user-request.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getArticleById(id: number) {
    const article = await this.prismaService.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new HttpException(
        { error: 'Article not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return article;
  }

  async getArticles(query: GetArticlesDto) {
    const { total } = query;

    const filterObj: any = {};

    if (total) {
      filterObj.take = total;
    }

    const articles = await this.prismaService.article.findMany(filterObj);

    return articles;
  }

  async createArticle(payload: CreateArticleDto, user: UserRequestDto) {
    const { title, description, body, published, createdAt, updatedAt } =
      payload;

    const { userId } = user;

    const article = await this.prismaService.article.create({
      data: {
        title,
        description,
        body,
        published,
        createdAt,
        updatedAt,
        authorId: userId,
      },
    });

    return article;
  }

  async updateArticle(id: string, body) {}
}
