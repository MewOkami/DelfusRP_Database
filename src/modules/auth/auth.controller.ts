import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() user: loginDto) {
    return this.authService.login(user.email, user.password);
  }
}
