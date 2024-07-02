import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Log } from '../entities/logs.entity';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/libs/auth/guard/auth.guard';
import { LogService } from '../service/logs.service';
import { CreateLogDto } from '../dtos/createLogs.dto';
import { UpdateLogDto } from '../dtos/updateLog.dto';

@ApiTags('logs')
@Controller('logs')
@UseGuards(AuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new log' })
  @ApiResponse({
    status: 201,
    description: 'The log has been successfully created.',
    type: Log,
  })
  async create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.createLog(createLogDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all logs' })
  @ApiResponse({
    status: 200,
    description: 'The logs have been successfully retrieved.',
    type: [Log],
  })
  async findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific log' })
  @ApiResponse({
    status: 200,
    description: 'The log has been successfully retrieved.',
    type: Log,
  })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  async findOne(@Param('id') id: string) {
    return this.logService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific log' })
  @ApiResponse({
    status: 200,
    description: 'The log has been successfully updated.',
    type: Log,
  })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<Log> {
    return this.logService.updateLog(id, updateLogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific log' })
  @ApiResponse({
    status: 200,
    description: 'The log has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  async deleteLog(@Param('id') id: string) {
    return this.logService.deleteLog(id);
  }
}
