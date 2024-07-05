import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTechnologyDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  subtechnology: number[];

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
