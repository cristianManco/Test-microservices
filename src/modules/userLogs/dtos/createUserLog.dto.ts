import {
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  system_name: string;

  @IsString()
  apiKey: string;

  @IsOptional()
  @IsNumber()
  requestCount?: number;

  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @IsOptional()
  @IsDate()
  blockedAt?: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @IsOptional()
  @IsString()
  createBy?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @IsOptional()
  @IsString()
  deleteBy?: string;
}
