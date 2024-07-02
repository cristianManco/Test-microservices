import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLogs } from '../entities/userLogs.entiyt';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/libs/auth/guard/auth.guard';
import { UserLogService } from '../service/userLogs.service';
import { CreateUserDto } from '../dtos/createUserLog.dto';
import { UpdateUserDto } from '../dtos/updateUserLog.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserLogService) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserLogs,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserLogs> {
    return this.userService.createUser(createUserDto);
  }

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
  async findOne(@Param('id') id: string): Promise<UserLogs> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserLogs> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully blocked.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async blockUser(@Param('id') id: string): Promise<UserLogs> {
    return this.userService.blockUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
