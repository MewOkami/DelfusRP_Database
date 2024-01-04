import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsIn(['normal', 'incomum', 'raro', 'epico', 'unico', 'lendario'])
  @IsNotEmpty()
  rarity: string;
}
