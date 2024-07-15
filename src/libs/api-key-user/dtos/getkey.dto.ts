import { IsNumber, IsString } from 'class-validator';

export class GetApiKeysDto {
  @IsNumber()
  limit: number;

  @IsString()
  type: string;
}
