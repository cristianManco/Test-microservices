import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTipDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  img_url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  level: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  technology: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  subtechnology: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  lang: number[];

  @IsString()
  @IsOptional()
  createBy?: string;

  @IsString()
  @IsOptional()
  updateBy?: string;

  @IsString()
  @IsOptional()
  deleteBy?: string;
}
