import { Module } from '@nestjs/common';
import { UsercardsService } from './usercards.service';
import { UsercardsController } from './usercards.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsercardsController],
  providers: [UsercardsService, PrismaService],
})
export class UsercardsModule {}
