import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TipsService } from '../service/tips.service';
import { Tip } from '../entities/tips.entity';
import { CreateTipDto } from '../dtos/createTips.dto';
import { UpdateTipDto } from '../dtos/updateTips.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilterTipsDto } from '../dtos/filtersTip.dto';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post('new')
  @ApiOperation({ summary: 'Crear un nuevo tip' })
  @ApiResponse({
    status: 201,
    description: 'El tip ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createTipDto: CreateTipDto) {
    return this.tipsService.create(createTipDto);
  }

  @Post('random')
  @ApiOperation({ summary: 'Get random tips based on filters' })
  @ApiResponse({
    status: 200,
    description: 'Random list of tips based on filters.',
  })
  async RandomTips(@Body() filters: FilterTipsDto) {
    try {
      return await this.tipsService.getRandomTips(filters);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtener todos los tips con filtro y paginación' })
  @ApiResponse({ status: 200, description: 'Lista de todos los tips.' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title: string,
    @Query('technology') technology: string,
    @Query('subtechnology') subtechnology: string,
    @Query('lang') lang: string,
    @Query('level') level: string,
  ) {
    return this.tipsService.findAll({
      page,
      limit,
      title,
      technology,
      subtechnology,
      lang,
      level,
    });
  }

  // @Get('all')
  // async findAll(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  //   @Query('sort') sort: string = 'createdAt',
  //   @Query() query: any,
  // ): Promise<Tip[]> {
  //   return this.tipsService.findAll(query, page, limit, sort);
  // }

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
