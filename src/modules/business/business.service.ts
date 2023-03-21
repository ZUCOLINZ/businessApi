import { Injectable } from '@nestjs/common';
import { Business } from 'src/entities/Business';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from '../dtos/CreateBusiness.dtos';
import { UpdateBusinessDto } from '../dtos/UpdateBusiness';
import { Branch } from 'src/entities/Branch';
import { Wallet } from 'src/entities/Wallet';
import { RevenueGoal } from 'src/entities/RevenueGoal';
import { CreateRevenueGoalDto } from '../dtos/CreateRevenueGoal.dtos';
@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business) private businessRepo: Repository<Business>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    @InjectRepository(RevenueGoal)
    private readonly revenueGoalRepository: Repository<RevenueGoal>,
  ) {}
  async findBusiness() {
    return await this.businessRepo.find();
  }

  async createBusiness(businessDetails: CreateBusinessDto) {
    try {
      const newBusiness = this.businessRepo.create({
        ...businessDetails,
      });
      await this.businessRepo.save(newBusiness);

      const branch: Branch[] = [];
      branch.push({
        business: newBusiness,
        branchName: `branch_${newBusiness.id}`,
        address: newBusiness.location,
      });

      const wallet = await this.walletRepo.save(
        new Wallet({
          accountName: newBusiness.businessName,
          business: newBusiness,
          accountNumber: Math.floor(Math.random() * 99999999999),
        }),
      );

      await this.businessRepo.save(
        new Business({
          id: newBusiness.id,
          branch: branch,
          wallet: wallet,
        }),
      );
      await this.branchRepo.save(branch);
      return await this.businessRepo.findOne({
        where: {
          id: newBusiness.id,
        },
        relations: ['branch', 'wallet'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateBusiness(id: number, updateBusinessDetails: UpdateBusinessDto) {
    try {
      const foundBusiness = await this.businessRepo.findOne({
        where: { id },
      });

      if (!foundBusiness) {
        throw new Error();
      }
      const updatedBusiness = await this.businessRepo.save(
        new Business({
          id: foundBusiness.id,
          businessName: updateBusinessDetails.businessName,
          businessPhone: updateBusinessDetails.businessPhone,
          businessEmail: updateBusinessDetails.businessEmail,
          city: updateBusinessDetails.city,
          location: updateBusinessDetails.location,
        }),
      );
      return updatedBusiness;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  async deleteBusinessById(id: number) {
    try {
      const foundBusiness = await this.businessRepo.findOne({
        where: { id },
      });

      if (!foundBusiness) {
        throw new Error();
      }
      await this.businessRepo.remove(
        new Business({
          id: id,
        }),
      );
    } catch (error) {}
  }

  async createRevenueGoal(
    id: number,
    createRevenueGoalDto: CreateRevenueGoalDto,
  ) {
    const business = await this.businessRepo.findOne({
      where: { id },
    });
    if (!business) {
      throw new Error('Business not found');
    }
    const revenueGoal = this.revenueGoalRepository.create({
      ...createRevenueGoalDto,
      business,
    });
    return await this.revenueGoalRepository.save(revenueGoal);
  }

  async updateRevenueGoal(
    id: number,
    revenueGoalId: number,
    updateRevenueGoalDto: CreateRevenueGoalDto,
  ) {
    const revenueGoal = await this.revenueGoalRepository.findOne({
      where: { id: revenueGoalId, business: { id } },
    });
    if (!revenueGoal) {
      throw new Error('Revenue goal not found');
    }
    this.revenueGoalRepository.merge(revenueGoal, updateRevenueGoalDto);
    return await this.revenueGoalRepository.save(revenueGoal);
  }

  async removeRevenueGoal(id: number, revenueGoalId: number) {
    const revenueGoal = await this.revenueGoalRepository.findOne({
      where: { id: revenueGoalId, business: { id } },
    });
    if (!revenueGoal) {
      throw new Error('Revenue goal not found');
    }
    await this.revenueGoalRepository.remove(revenueGoal);
  }
}
