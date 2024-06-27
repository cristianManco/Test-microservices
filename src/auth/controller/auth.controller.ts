import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('api-keys')
export class AuthController {
  constructor(private readonly apiKeyService: AuthService) {}

  @Post('new')
  async create() {
    try {
      return await this.apiKeyService.createApiKey();
    } catch (error) {
      throw new HttpException(
        'Failed to create API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.apiKeyService.getApiKey(id);
    } catch (error) {
      throw new HttpException('API key not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateApiKeyDto: any) {
    try {
      return await this.apiKeyService.updateApiKey(id, updateApiKeyDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.apiKeyService.revokeApiKey(id);
      return { message: 'API key revoked successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to revoke API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      return await this.apiKeyService.findAll(+page, +limit);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve API keys',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
