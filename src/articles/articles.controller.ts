import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  createArticle(@Body() body: CreateArticleDto) {
    return this.articlesService.createArticle(body);
  }
}
