import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TechnologyService } from '../service/technology.service';
import { CreateTechnologyDto } from '../dtos/createTechnology.dto';
import { Tecnology } from '../entity/tecnology.entity';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post('new')
  create(@Body() createTechnologyDto: CreateTechnologyDto): Promise<Tecnology> {
    return this.technologyService.create(createTechnologyDto);
  }

  @Get('all')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Tecnology[]> {
    return this.technologyService.findAll(page, limit);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Tecnology> {
    return this.technologyService.delete(id);
  }
}
