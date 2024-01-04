import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsercardsService } from './usercards.service';
import { CreateUsercardDto } from './dto/create-usercard.dto';
import { UpdateUsercardDto } from './dto/update-usercard.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usercards')
export class UsercardsController {
  constructor(private readonly usercardsService: UsercardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUsercardDto: CreateUsercardDto, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.usercardsService.create(createUsercardDto);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.usercardsService.findAll();
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.usercardsService.findOne(id);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUsercardDto: UpdateUsercardDto,
    @Request() req,
  ) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.usercardsService.update(id, updateUsercardDto);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.usercardsService.remove(id);
    }

    throw new UnauthorizedException('You dont have permission');
  }
}
