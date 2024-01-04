import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    const findNick = await this.prisma.user.findFirst({
      where: { nick: createUserDto.nick },
    });

    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    if (findNick) {
      throw new ConflictException('Nickname already exists');
    }

    const user = new User();

    Object.assign(user, {
      ...createUserDto,
    });

    await this.prisma.user.create({
      data: { ...user },
      include: {
        cards: true,
      },
    });

    return plainToInstance(User, user);
  }

  async findAll(userInfoId: string, userInfo: boolean) {
    const findUser = await this.prisma.user.findMany({
      include: {
        cards: true,
      },
    });

    if (userInfo === true) {
      return plainToInstance(User, findUser);
    } else {
      const result = [];

      findUser.forEach((findIds) => {
        if (findIds.id == userInfoId) {
          result.push(findIds);
        }
      });

      return plainToInstance(User, result);
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cards: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    return plainToInstance(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cards: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return plainToInstance(User, updateUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    const findUser = await this.prisma.user.findFirst({
      where: { email },
    });

    return findUser;
  }
}
