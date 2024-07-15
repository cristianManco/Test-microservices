import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ApiKeySubscription,
  ApiKeySubscriptionDocument,
} from '../entities/apikey.entity';
import { CreateApiKeyDto } from '../dtos/createApikey.dto';
import * as uuid from 'uuid';

@Injectable()
export class ApiKeySubscriptionService {
  private readonly logger = new Logger(ApiKeySubscriptionService.name);

  constructor(
    @InjectModel(ApiKeySubscription.name)
    private apiKeySubscriptionModel: Model<ApiKeySubscriptionDocument>,
  ) {}

  private generateApiKey(type: string): string {
    const length = type === 'tvs' ? 15 : 30;
    return [...Array(length)]
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join('');
  }

  async create(
    createApiKeySubscriptionDto: CreateApiKeyDto,
  ): Promise<ApiKeySubscription> {
    const { typeSubscription, limit, createdBy } = createApiKeySubscriptionDto;
    const apiKey = this.generateApiKey(typeSubscription);
    const id = uuid.v4();
    const newApiKeySubscription = new this.apiKeySubscriptionModel({
      id,
      typeSubscription,
      apiKey,
      createdBy,
      limit,
    });
    const savedApiKey = await newApiKeySubscription.save();

    // Validar la API key después de su creación
    await this.validateApiKey(apiKey);

    return savedApiKey;
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    if (!apiKey) {
      this.logger.warn('API key is missing');
      return false;
    }

    this.logger.log(`Validating API key: ${apiKey}`);
    const apiKeySubscription = await this.apiKeySubscriptionModel
      .findOne({ apiKey, isActive: true })
      .exec();

    if (!apiKeySubscription) {
      this.logger.warn(`API key not found or not active: ${apiKey}`);
      return false;
    }

    if (apiKeySubscription.usageCount < apiKeySubscription.limit) {
      apiKeySubscription.usageCount += 1;
      await apiKeySubscription.save();
      this.logger.log(`API key usage updated: ${apiKey}`);
      return true;
    } else {
      apiKeySubscription.isActive = false;
      await apiKeySubscription.save();
      this.logger.warn(
        `API key usage limit reached and deactivated: ${apiKey}`,
      );
      return false;
    }
  }

  async getApiKeys(limit: number, type: string): Promise<ApiKeySubscription[]> {
    return this.apiKeySubscriptionModel
      .find({ type, isActive: true })
      .limit(limit)
      .exec();
  }

  async cancelApiKey(id: string): Promise<void> {
    await this.apiKeySubscriptionModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
  }
}
