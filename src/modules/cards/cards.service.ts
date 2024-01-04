import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Card } from './entities/card.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto, userInfo: string) {
    const findCard = await this.prisma.card.findFirst({
      where: { name: createCardDto.name },
    });

    if (findCard) {
      throw new ConflictException('Card already exists');
    }

    const card = new Card();

    Object.assign(card, {
      ...createCardDto,
    });

    await this.prisma.card.create({
      data: { ...card },
    });

    return plainToInstance(Card, card);
  }

  async findAll(userInfo: string, userInfoAdm: boolean) {
    const findUser = await this.prisma.card.findMany({
      include: {
        users: true,
      },
    });

    if (userInfoAdm === true) {
      return findUser;
    } else {
      let resultIds = [];
      const result = [];

      findUser.forEach((findIds) => {
        resultIds = findIds.users;

        resultIds.forEach((userIds) => {
          if (userIds.userId == userInfo) {
            result.push(findIds);
          }
        });
      });

      return result;
    }
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Not found');
    }

    return plainToInstance(Card, card);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Not found');
    }

    const updateCard = await this.prisma.card.update({
      where: { id },
      data: { ...updateCardDto },
    });

    return plainToInstance(Card, updateCard);
  }

  async remove(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Not found');
    }

    await this.prisma.card.delete({ where: { id } });
  }
}
