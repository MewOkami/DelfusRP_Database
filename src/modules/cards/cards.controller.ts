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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCardDto: CreateCardDto, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.cardsService.create(createCardDto, userInfo);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const userInfo = req.user.id;
    const userInfoAdm = req.user.adm;
    return this.cardsService.findAll(userInfo, userInfoAdm);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.cardsService.findOne(id);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Request() req,
  ) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.cardsService.update(id, updateCardDto);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    const userInfo = req.user.adm;

    if (userInfo === true) {
      return this.cardsService.remove(id);
    }

    throw new UnauthorizedException('You dont have permission');
  }
}
