import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/entities/Branch';
import { Business } from 'src/entities/Business';
import { Repository } from 'typeorm';
import { UpdateBranchDto } from '../dtos/UpdateBranch';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Business) private businessRepo: Repository<Business>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}
  async findBranch() {
    return await this.branchRepo.find();
  }

  async findOneBranch(id: number) {
    return await this.branchRepo.findOne({
      where: { id },
    });
  }

  async updateBranch(id: number, updateBranchDetails: UpdateBranchDto) {
    try {
      const foundBranch = await this.branchRepo.findOne({
        where: { id },
      });

      if (!foundBranch) {
        throw new Error();
      }
      const updatedBranch = await this.branchRepo.save(
        new Branch({
          id: foundBranch.id,
          branchName: updateBranchDetails.branchName,
          postalCode: updateBranchDetails.postalCode,
          address: updateBranchDetails.address,
        }),
      );
      return updatedBranch;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  async deleteBranchById(id: number) {
    try {
      const foundBranch = await this.branchRepo.findOne({
        where: { id },
      });

      if (!foundBranch) {
        throw new Error();
      }
      await this.branchRepo.remove(
        new Business({
          id: id,
        }),
      );
    } catch (error) {}
  }
}
