import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: username },
    });

    return user;
  }

  async createUser(payload: CreateUserDto) {
    const { name, email, password } = payload;

    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: { name, email, password: hashedPassword },
    });

    return user;
  }
}
