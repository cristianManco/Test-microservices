import { IsNumber, IsString } from 'class-validator';

export class CancelSubscriptionDto {
  @IsNumber()
  id: number;

  @IsString()
  cancelledBy: string;
}
