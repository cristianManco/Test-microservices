import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiKeySubscriptionService } from '../service/apikey.service';
import { CreateApiKeyDto } from '../dtos/createApikey.dto';

@Controller('key-subscription')
export class ApiKeySubscriptionController {
  constructor(
    private readonly apiKeySubscriptionService: ApiKeySubscriptionService,
  ) {}

  @Post('create')
  async create(@Body() createApiKeySubscriptionDto: CreateApiKeyDto) {
    return this.apiKeySubscriptionService.create(createApiKeySubscriptionDto);
  }

  @Post('validate')
  async validateApiKey(@Body('apiKey') apiKey: string) {
    return this.apiKeySubscriptionService.validateApiKey(apiKey);
  }

  @Post('cancel')
  async cancelApiKey(@Body('id') id: string) {
    return this.apiKeySubscriptionService.cancelApiKey(id);
  }

  @Get('keys')
  async getApiKeys(@Query('limit') limit: number, @Query('type') type: string) {
    return this.apiKeySubscriptionService.getApiKeys(limit, type);
  }
}
