import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiKey, ApiKeyDocument } from '../entities/api-key.entity';
import { CreateApiKeyDto } from '../dtos/createApiKey.dto';
import { UpdateApiKeyDto } from '../dtos/updateApiKey.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  async createApiKey(
    createApiKeyDto: CreateApiKeyDto,
  ): Promise<{ key: string; isActive: boolean }> {
    const key = await this.generateApiKey();
    const hashedKey = await bcrypt.hash(key, 10);
    const newApiKey = new this.apiKeyModel({
      ...createApiKeyDto,
      key: hashedKey,
    });
    await newApiKey.save();
    return { key, isActive: newApiKey.isActive };
  }

  async getApiKey(id: string): Promise<ApiKey> {
    const apiKey = await this.apiKeyModel.findById(id).exec();
    if (!apiKey) {
      throw new NotFoundException('API Key not found');
    }
    return apiKey;
  }

  async updateApiKey(
    id: string,
    updateApiKeyDto: UpdateApiKeyDto,
  ): Promise<ApiKey> {
    const updatedApiKey = await this.apiKeyModel
      .findByIdAndUpdate(id, updateApiKeyDto, { new: true })
      .exec();
    if (!updatedApiKey) {
      throw new NotFoundException('API Key not found');
    }
    return updatedApiKey;
  }

  async revokeApiKey(id: string): Promise<void> {
    const apiKey = await this.apiKeyModel.findById(id).exec();
    if (!apiKey) {
      throw new NotFoundException('API Key not found');
    }
    apiKey.isActive = false;
    await apiKey.save();
  }

  async findAll(page: number, limit: number): Promise<ApiKey[]> {
    const skip = (page - 1) * limit;
    return this.apiKeyModel.find().skip(skip).limit(limit).exec();
  }

  async validateApiKey(key: string): Promise<boolean> {
    const apiKeys = await this.apiKeyModel.find({ isActive: true }).exec();
    for (const apiKey of apiKeys) {
      const isMatch = await bcrypt.compare(key, apiKey.key);
      if (isMatch) {
        await this.updateLastUsed(apiKey.id); // Actualizamos la fecha de último uso
        return true;
      }
    }
    return false;
  }

  private async updateLastUsed(id: string): Promise<void> {
    await this.apiKeyModel
      .findByIdAndUpdate(id, { lastUsedAt: new Date() })
      .exec();
  }

  private async generateApiKey(): Promise<string> {
    return [...Array(30)]
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join('');
  }
}
