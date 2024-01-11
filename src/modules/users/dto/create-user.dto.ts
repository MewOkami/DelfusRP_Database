import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsIn(['feminino', 'masculino', 'outros'])
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  nick: string;

  @IsString()
  @IsIn([
    'humano',
    'elfo',
    'anao',
    'minotauro',
    'fada',
    'tiefling',
    'draconianos',
    'bestial',
  ])
  @IsNotEmpty()
  race: string;

  @IsString()
  @IsNotEmpty()
  yearPlayer: string;

  @IsString()
  @IsIn(['feminino', 'masculino', 'outros'])
  @IsNotEmpty()
  sexPlayer: string;

  @IsString()
  @MinLength(500)
  @MaxLength(1000)
  @IsNotEmpty()
  lorePlayer: string;

  @IsBoolean()
  @IsOptional()
  adm?: boolean = false;
}
