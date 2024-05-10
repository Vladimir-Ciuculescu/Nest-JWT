import { Expose } from 'class-transformer';

export class ArticleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  body: string;

  published: boolean;

  createdAt: Date;

  updatedAt: Date;

  authorId: Date;
}
