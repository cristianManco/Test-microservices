import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tips.entity';
import { Tecnology, TecnologyDocument } from '../entities/tecnology.entity';
import { Lang, LangDocument } from '../entities/lang.entity';
import { Level, LevelDocument } from '../entities/levels.entity';
import {
  Subtechnology,
  SubtechnologyDocument,
} from '../entities/subTecnology.entity';
@Injectable()
export class TipsService {
  constructor(
    @InjectModel(Tip.name) private tipModel: Model<TipDocument>,
    @InjectModel(Tecnology.name)
    private technologyModel: Model<TecnologyDocument>,
    @InjectModel(Subtechnology.name)
    private subtechnologyModel: Model<SubtechnologyDocument>,
    @InjectModel(Lang.name) private langModel: Model<LangDocument>,
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {}

  async create(tip: Partial<Tip>): Promise<Tip> {
    const createdTip = new this.tipModel(tip);
    return createdTip.save();
  }

  async findAll(
    query: any,
    page: number = 1,
    limit: number = 10,
    sort: string = 'createdAt',
  ): Promise<Tip[]> {
    const skip = (page - 1) * limit;
    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sort] = 1;

    const filter: any = { deletedAt: null };

    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.level) {
      filter.level = query.level;
    }
    if (query.technology) {
      filter.technology = { $in: query.technology.split(',') };
    }
    if (query.subtechnology) {
      filter.subtechnology = { $in: query.subtechnology.split(',') };
    }
    if (query.lang) {
      filter.lang = query.lang;
    }
    if (query.available) {
      filter.available = query.available === 'true';
    }

    return this.tipModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
  }

  async findOne(id: string): Promise<Tip> {
    const tip = await this.tipModel
      .findById(id)
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async update(id: string, updateData: Partial<Tip>): Promise<Tip> {
    const tip = await this.tipModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('technology')
      .populate('subtechnology')
      .populate('lang')
      .populate('level')
      .exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async delete(id: string): Promise<void> {
    const tip = await this.tipModel.findById(id).exec();
    if (!tip) {
      throw new NotFoundException('Tip not found');
    }
    tip.deletedAt = new Date();
    await tip.save();
  }
}
