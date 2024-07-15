import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  img_url?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  level: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  technology: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  subtechnology: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  lang: string[];

  @ApiProperty()
  @IsString()
  createBy: string;
}

export class UpdateTipDto extends CreateTipDto {}
