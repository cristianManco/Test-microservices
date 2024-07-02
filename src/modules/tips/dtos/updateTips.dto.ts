import { PartialType } from '@nestjs/swagger';
import { CreateTipDto } from './createTips.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTipDto extends PartialType(CreateTipDto) {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  updateBy?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deletedAt?: Date;

  @IsString()
  @IsOptional()
  deleteBy?: string;
}
