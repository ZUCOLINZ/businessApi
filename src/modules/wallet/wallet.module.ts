import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/entities/Business';
import { Branch } from 'src/entities/Branch';
import { Wallet } from 'src/entities/Wallet';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Branch, Wallet])],

  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
