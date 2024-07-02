import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubtechnologyService } from '../service/subtechnology.service';
import { CreateSubtechnologyDto } from '../dtos/subtechnology.dto';
import { Subtechnology } from '../entity/subTecnology.entity';

@Controller('subtechnology')
export class SubtechnologyController {
  constructor(private readonly subtechnologyService: SubtechnologyService) {}

  @Post('new')
  create(
    @Body() createSubtechnologyDto: CreateSubtechnologyDto,
  ): Promise<Subtechnology> {
    return this.subtechnologyService.create(createSubtechnologyDto);
  }

  @Get('all')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Subtechnology[]> {
    return this.subtechnologyService.findAll(page, limit);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Subtechnology> {
    return this.subtechnologyService.delete(id);
  }
}
