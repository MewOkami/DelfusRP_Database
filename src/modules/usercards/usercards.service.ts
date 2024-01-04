import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsercardDto } from './dto/create-usercard.dto';
import { UpdateUsercardDto } from './dto/update-usercard.dto';
import { Usercard } from './entities/usercard.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsercardsService {
  constructor(private prisma: PrismaService) {}

  async create(createUsercardDto: CreateUsercardDto) {
    const userCard = new Usercard();

    Object.assign(userCard, {
      ...createUsercardDto,
    });

    await this.prisma.usercard.create({
      data: { ...userCard },
    });

    return userCard;
  }

  async findAll() {
    const findUserCard = await this.prisma.usercard.findMany();
    return findUserCard;
  }

  async findOne(id: string) {
    const findUserCard = await this.prisma.usercard.findUnique({
      where: { id },
    });

    if (!findUserCard) {
      throw new NotFoundException('Not found');
    }

    return findUserCard;
  }

  async update(id: string, updateUsercardDto: UpdateUsercardDto) {
    const findUserCard = await this.prisma.usercard.findUnique({
      where: { id },
    });

    if (!findUserCard) {
      throw new NotFoundException('Not found');
    }

    const updateUseCard = await this.prisma.usercard.update({
      where: { id },
      data: { ...updateUsercardDto },
    });

    return updateUseCard;
  }

  async remove(id: string) {
    const userCard = await this.prisma.usercard.findUnique({
      where: { id },
    });

    if (!userCard) {
      throw new NotFoundException('Not found');
    }

    await this.prisma.usercard.delete({ where: { id } });
  }
}
