import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnology, TecnologyDocument } from '../entity/tecnology.entity';
import { CreateTechnologyDto } from '../dtos/createTechnology.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectModel(Tecnology.name)
    private technologyModel: Model<TecnologyDocument>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto): Promise<Tecnology> {
    const createdTechnology = new this.technologyModel(createTechnologyDto);
    return createdTechnology.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Tecnology[]> {
    return this.technologyModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByIds(ids: number[]): Promise<Tecnology[]> {
    return this.technologyModel.find({ id: { $in: ids } }).exec();
  }

  async delete(id: number): Promise<Tecnology> {
    const technology = await this.technologyModel
      .findOneAndDelete({ id })
      .exec();
    if (!technology) {
      throw new NotFoundException(`Technology with id ${id} not found`);
    }
    return technology;
  }
}
