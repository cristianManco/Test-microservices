import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../entities/logs.entity';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async createLog(logData: Partial<Log>): Promise<Log> {
    const newLog = new this.logModel(logData);
    return newLog.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }

  async findOne(id: string): Promise<Log> {
    const log = await this.logModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException('Log not found');
    }
    return log;
  }

  async deleteLog(id: string): Promise<void> {
    const result = await this.logModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Log not found');
    }
  }
}
