import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  body: string;

  @IsBoolean()
  published: boolean;

  //   @IsDate()
  //   createdat: Date;

  //   @IsDate()
  //   updatedAt: Date;
}
