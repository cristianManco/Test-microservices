import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiKey, ApiKeyDocument } from '../entities/api-key.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  async createApiKey(): Promise<{ key: string; isActive: boolean }> {
    const key = await this.generateApiKey();
    const hashedKey = await bcrypt.hash(key, 10);
    const newApiKey = new this.apiKeyModel({ key: hashedKey });
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

  async updateApiKey(id: string, update: Partial<ApiKey>): Promise<ApiKey> {
    const updatedApiKey = await this.apiKeyModel
      .findByIdAndUpdate(id, update, { new: true })
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
        return true;
      }
    }
    return false;
  }

  private async generateApiKey(): Promise<string> {
    return await [...Array(30)]
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join('');
  }
}
