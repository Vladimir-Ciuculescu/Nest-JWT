import { Expose } from 'class-transformer';

export class UserRequestDto {
  @Expose()
  userId: number;

  @Expose()
  email: string;
}
