import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':id')
  getWallet(@Param('id', ParseIntPipe) id: number) {
    return this.walletService.findWallet(id);
  }

  @Put(':id')
  async fundWalletById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    const result = await this.walletService.fundWallet(id, amount);
    return res.status(200).json({ message: 'Successfully funded', result });
  }
}
