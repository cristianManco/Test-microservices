import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  typeSubscription: string;

  @IsInt()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsOptional()
  createdBy: string;
}
