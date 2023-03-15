import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/Wallet';
import { Repository } from 'typeorm';
import { transferDto } from './wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
  ) {}

  async findWallet(id: number) {
    try {
      const foundWallet = await this.walletRepo.findOne({
        where: { id },
      });

      if (!foundWallet) {
        throw new Error();
      }
      return foundWallet;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async fundWallet(id: number, amount: number) {
    try {
      const foundWallet = await this.findWallet(id);

      if (!foundWallet) {
        throw new Error();
      }
      const fundWallet = new Wallet({
        id: foundWallet.id,
        amount,
        balance: foundWallet.balance + amount,
      });
      const savedWallet = await this.walletRepo.save(fundWallet);
      return savedWallet;
    } catch (error) {
      throw new Error(error);
    }
  }

  async transferFunds(data: transferDto) {
    const { fromWalletId, toWalletId, amount } = data;
    const fromWallet = await this.walletRepo.findOne({
      where: { id: fromWalletId },
    });
    const toWallet = await this.walletRepo.findOne({
      where: { id: toWalletId },
    });

    if (!fromWallet || !toWallet) {
      throw new Error('Invalid wallet ID');
    }

    if (fromWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    try {
      await this.walletRepo.manager.transaction(async (transactionRepo) => {
        await transactionRepo.decrement(
          Wallet,
          { id: fromWallet.id },
          'balance',
          amount,
        );

        await transactionRepo.increment(
          Wallet,
          { id: toWallet.id },
          'balance',
          amount,
        );
      });
    } catch (error) {
      throw new Error(error);
    }
    return {
      fromWallet,
    };
  }
}
