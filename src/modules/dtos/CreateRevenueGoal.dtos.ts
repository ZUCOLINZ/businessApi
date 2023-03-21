import { IsNumber, IsString } from 'class-validator';

export class CreateRevenueGoalDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: 'NGN' | 'DOLLAR';

  @IsNumber()
  businessId: number;

  @IsNumber()
  branchId: number;

  @IsNumber()
  endDate: Date;

  @IsNumber()
  startDate: Date;
}
