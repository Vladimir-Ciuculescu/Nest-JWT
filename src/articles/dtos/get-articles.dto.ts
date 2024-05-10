import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetArticlesDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ obj }) => parseInt(obj.total))
  total: number;
}
