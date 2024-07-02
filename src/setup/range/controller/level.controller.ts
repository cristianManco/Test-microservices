import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { LevelService } from '../service/level.service';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('new')
  async create(@Body() createLevelDto: any) {
    return this.levelService.create(createLevelDto);
  }

  @Get('all')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.levelService.findAll(page, limit);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.levelService.delete(id);
  }
}
