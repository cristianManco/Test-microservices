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
import { CreateTipDto } from '../dtos/createTips.dto';
import { UpdateTipDto } from '../dtos/updateTips.dto';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('new')
  async create(@Body() createTipDto: CreateTipDto): Promise<Tip> {
    return this.tipsService.create(createTipDto);
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
    @Body() updateTipDto: UpdateTipDto,
  ): Promise<Tip> {
    return this.tipsService.update(id, updateTipDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tipsService.delete(id);
  }
}
