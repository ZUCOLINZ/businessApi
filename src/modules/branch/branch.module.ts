import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Business } from 'src/entities/Business';
import { Branch } from 'src/entities/Branch';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Branch])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
