import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/Wallet';
import { Repository } from 'typeorm';

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
      console.log(error);
      throw new Error();
    }
  }
}
