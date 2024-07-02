import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateTipDto {
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
  @IsMongoId({ each: true })
  @IsOptional()
  level?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  technology?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subtechnology?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  lang?: string[];

  @IsString()
  @IsOptional()
  createBy?: string;
}
