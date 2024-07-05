import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateSubtechnologyDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  technology: number[];

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
