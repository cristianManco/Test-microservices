import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLevelDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

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
