import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/entities/Business';
import { Branch } from 'src/entities/Branch';
import { Wallet } from 'src/entities/Wallet';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Branch, Wallet])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [],
})
export class BusinessModule {}
