import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetArticlesDto } from './dtos/get-articles.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ArticleDto } from './dtos/article.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getArticles(@Query() query: GetArticlesDto) {
    return this.articlesService.getArticles(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getArticleById(@Param('id') id: string) {
    return this.articlesService.getArticleById(parseInt(id));
  }

  @Post('/add')
  // @UseInterceptors(new SerializeInterceptor(ArticleDto))
  @UseGuards(JwtAuthGuard)
  createArticle(@Req() req: any, @Body() body: CreateArticleDto) {
    console.log(5555, req.user);

    return this.articlesService.createArticle(body, req.user);
  }

  @Patch(':id')
  updateArticle(@Param('id') id: string, @Body() body: any) {
    return this.articlesService.updateArticle(id, body);
  }
}
