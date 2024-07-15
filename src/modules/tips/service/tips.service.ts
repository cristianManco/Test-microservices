import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from '../entities/tips.entity';
import { Lang, LangDocument } from '../../../setup/lang/entity/lang.entity';
import {
  Level,
  LevelDocument,
} from '../../../setup/range/entity/levels.entity';
import { CreateTipDto } from '../dtos/createTips.dto';
import { UpdateTipDto } from '../dtos/updateTips.dto';
import {
  Tecnology,
  TecnologyDocument,
} from 'src/setup/technology/entity/tecnology.entity';
import {
  Subtechnology,
  SubtechnologyDocument,
} from 'src/setup/subtechnology/entity/subTecnology.entity';
import { FilterTipsDto } from '../dtos/filtersTip.dto';

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

  async create(createTipDto: CreateTipDto): Promise<Tip> {
    await this.validateReferences(createTipDto);

    const technologyDetails = await this.getEntitiesDetails(
      this.technologyModel,
      createTipDto.technology,
    );
    const subtechnologyDetails = await this.getEntitiesDetails(
      this.subtechnologyModel,
      createTipDto.subtechnology,
    );
    const langDetails = await this.getEntitiesDetails(
      this.langModel,
      createTipDto.lang,
    );
    const levelDetails = await this.getEntitiesDetails(
      this.levelModel,
      createTipDto.level,
    );

    const createdTip = new this.tipModel({
      ...createTipDto,
      technology: technologyDetails,
      subtechnology: subtechnologyDetails,
      lang: langDetails,
      level: levelDetails,
    });

    return createdTip.save();
  }

  async findAll(filters: any): Promise<Tip[]> {
    const {
      page = 1,
      limit = 10,
      title,
      technology,
      subtechnology,
      lang,
      level,
    } = filters;

    const query = this.tipModel.find();

    if (title) {
      query.where('title', new RegExp(title, 'i'));
    }
    if (technology) {
      query.where('technology.name').in([technology]);
    }
    if (subtechnology) {
      query.where('subtechnology.name').in([subtechnology]);
    }
    if (lang) {
      query.where('lang.name').in([lang]);
    }
    if (level) {
      query.where('level.name').in([level]);
    }

    return query
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
  }

  async findOne(id: string): Promise<Tip> {
    const tip = await this.tipModel.findById(id).exec();
    if (!tip || tip.deletedAt) {
      throw new NotFoundException('Tip not found');
    }
    return tip;
  }

  async update(id: string, updateTipDto: UpdateTipDto): Promise<Tip> {
    await this.validateReferences(updateTipDto);

    const technologyDetails = await this.getEntitiesDetails(
      this.technologyModel,
      updateTipDto.technology,
    );
    const subtechnologyDetails = await this.getEntitiesDetails(
      this.subtechnologyModel,
      updateTipDto.subtechnology,
    );
    const langDetails = await this.getEntitiesDetails(
      this.langModel,
      updateTipDto.lang,
    );
    const levelDetails = await this.getEntitiesDetails(
      this.levelModel,
      updateTipDto.level,
    );

    const tip = await this.tipModel
      .findByIdAndUpdate(
        id,
        {
          ...updateTipDto,
          technology: technologyDetails,
          subtechnology: subtechnologyDetails,
          lang: langDetails,
          level: levelDetails,
        },
        { new: true },
      )
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

  async validateReferences(tipDto: CreateTipDto | UpdateTipDto): Promise<void> {
    await this.validateEntityReferences(
      this.technologyModel,
      tipDto.technology,
      'Some technologies not found',
    );
    await this.validateEntityReferences(
      this.subtechnologyModel,
      tipDto.subtechnology,
      'Some subtechnologies not found',
    );
    await this.validateEntityReferences(
      this.langModel,
      tipDto.lang,
      'Some languages not found',
    );
    await this.validateEntityReferences(
      this.levelModel,
      tipDto.level,
      'Some levels not found',
    );
  }

  private async getEntitiesDetails(
    model: Model<any>,
    ids: string[],
  ): Promise<any[]> {
    const entities = await model.find({ _id: { $in: ids } }, '_id name').exec();
    return entities.map((entity) => ({
      _id: entity._id,
      name: entity.name,
    }));
  }

  private async validateEntityReferences(
    model: Model<any>,
    ids: string[],
    errorMessage: string,
  ): Promise<void> {
    if (ids) {
      const entities = await model.find({ _id: { $in: ids } }).exec();
      if (entities.length !== ids.length) {
        throw new NotFoundException(errorMessage);
      }
    }
  }

  async getRandomTips(filters: FilterTipsDto): Promise<any[]> {
    try {
      const { technology, subtechnology, lang, level, limit } = filters;
      const query = this.tipModel.find();

      if (technology && technology.length > 0) {
        const technologyIds = await this.getEntityIds(
          this.technologyModel,
          technology,
        );
        query.where('technology').in(technologyIds);
      }
      if (subtechnology && subtechnology.length > 0) {
        const subtechnologyIds = await this.getEntityIds(
          this.subtechnologyModel,
          subtechnology,
        );
        query.where('subtechnology').in(subtechnologyIds);
      }
      if (lang && lang.length > 0) {
        const langIds = await this.getEntityIds(this.langModel, lang);
        query.where('lang').in(langIds);
      }
      if (level && level.length > 0) {
        const levelIds = await this.getEntityIds(this.levelModel, level);
        query.where('level').in(levelIds);
      }

      const tips = await query.exec();
      const randomTips = this.shuffleArray(tips).slice(0, limit);

      // Convertir las entidades a los nombres correspondientes
      const formattedData = randomTips.map((tip) => ({
        ...tip.toObject(),
        technology: tip.technology.map((tech: any) => tech.name),
        subtechnology: tip.subtechnology.map((subtech: any) => subtech.name),
        lang: tip.lang.map((language: any) => language.name),
        level: tip.level.map((lvl: any) => lvl.name),
      }));

      return formattedData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getEntityIds(
    model: Model<any>,
    ids: string[],
  ): Promise<string[]> {
    try {
      const entities = await model.find({ _id: { $in: ids } }, '_id').exec();
      return entities.map((entity) => entity._id.toString());
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
