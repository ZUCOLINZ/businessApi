import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Res,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { transferDto } from './wallet.dto';
import { WalletService } from './wallet.service';
import { IsNumber } from 'class-validator';
@Controller('wallet/')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':id')
  getWallet(@Param('id', ParseIntPipe) id: number) {
    return this.walletService.findWallet(id);
  }

  @Put('fund/:id')
  @UsePipes(new ValidationPipe())
  async fundWalletById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number,
  ) {
    const result = await this.walletService.fundWallet(id, amount);
    res.status(200).json({ message: 'Successfully funded', result });
  }

  @Post('transfer')
  @UsePipes(new ValidationPipe())
  async transferFunds(@Res() res: Response, @Body() body: transferDto) {
    const result = await this.walletService.transferFunds(body);
    res.json({
      msg: 'transfer successful',
      result,
    });
  }
}
