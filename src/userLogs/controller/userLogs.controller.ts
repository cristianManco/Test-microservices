import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLogs } from '../entities/userLogs.entiyt';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserLogService } from '../service/userLogs.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserLogService) {}

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
    type: [UserLogs],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully blocked.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async blockUser(@Param('id') id: string) {
    return this.userService.blockUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
