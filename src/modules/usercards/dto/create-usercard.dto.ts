import { IsString } from 'class-validator';

export class CreateUsercardDto {
  @IsString()
  userId: string;

  @IsString()
  cardId: string;
}
