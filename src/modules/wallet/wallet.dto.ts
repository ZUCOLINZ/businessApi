import { IsNumber } from 'class-validator';

export class transferDto {
  @IsNumber()
  fromWalletId: number;

  @IsNumber()
  toWalletId: number;

  @IsNumber()
  amount: number;
}
