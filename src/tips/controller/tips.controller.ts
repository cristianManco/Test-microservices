import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { TipsService } from '../service/tips.service';
import { Tip } from '../entities/tips.entity';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('new')
  async create(@Body() tip: Partial<Tip>): Promise<Tip> {
    return this.tipsService.create(tip);
  }

  @Get('all')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Query() query: any,
  ): Promise<Tip[]> {
    return this.tipsService.findAll(query, page, limit, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tip> {
    return this.tipsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Tip>,
  ): Promise<Tip> {
    return this.tipsService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tipsService.delete(id);
  }
}
