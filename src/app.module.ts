import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './modules/business/business.module';
import { BranchModule } from './modules/branch/branch.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { Business } from './entities/Business';
import { Branch } from './entities/Branch';
import { Wallet } from './entities/Wallet';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin2',
      password: 'collinsokoye',
      database: 'thidgy',
      entities: [Business, Branch, Wallet],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Business, Branch, Wallet]),
    BusinessModule,
    BranchModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
