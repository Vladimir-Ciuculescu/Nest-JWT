import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  published: boolean;

  @IsDate({})
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<CreateArticleDto>) {
    Object.assign(this, partial);

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
