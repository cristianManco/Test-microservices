// import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsInt,
  // IsDate,
  IsOptional,
} from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @IsString()
  @IsNotEmpty()
  system_name: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsObject()
  @IsNotEmpty()
  requestBody: any;

  @IsObject()
  @IsNotEmpty()
  responseBody: any;

  @IsInt()
  @IsNotEmpty()
  statusCode: number;

  // @IsDate()
  // @IsOptional()
  // @Type(() => Date)
  // timestamp?: Date;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsInt()
  @IsOptional()
  duration?: number;
}
