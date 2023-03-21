import { IsNumber, IsString } from 'class-validator';

export class UpdateRevenueGoalDto {
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
