import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CardsModule } from './modules/cards/cards.module';
import { UsercardsModule } from './modules/usercards/usercards.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, CardsModule, UsercardsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
