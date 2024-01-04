import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  // @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
