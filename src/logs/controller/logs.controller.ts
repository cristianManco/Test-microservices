import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Log } from '../entities/logs.entity';
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LogService } from '../service/logs.service';

@ApiTags('logs')
@Controller('logs')
@UseGuards(AuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

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
