import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from '../dtos/CreateBusiness.dtos';
import { UpdateBusinessDto } from '../dtos/UpdateBusiness';
import { Response } from 'express';
import { CreateRevenueGoalDto } from '../dtos/CreateRevenueGoal.dtos';
import { UpdateRevenueGoalDto } from '../dtos/UpdateRevenueGoal';

@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService, // private readonly revenueGoal: RevenueGoal,
  ) {}

  @Get()
  async getBusiness() {
    return await this.businessService.findBusiness();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createBusiness(
    @Res() res: Response,
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    const result = await this.businessService.createBusiness(createBusinessDto);
    res.json({ msg: 'successfully created', result });
  }

  @Put(':id')
  async updateBusinessById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    const result = await this.businessService.updateBusiness(
      id,
      updateBusinessDto,
    );
    res.json({ msg: 'Business Updated Successfully', result });
  }

  @Delete(':id')
  async deleteBusinessById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.businessService.deleteBusinessById(id);
    res.json({ msg: 'Profile deleted successfully' });
  }

  @Post(':businessId/revenue-goals')
  async createRevenueGoal(
    @Param('businessId') businessId: number,
    @Body() createRevenueGoalDto: CreateRevenueGoalDto,
  ) {
    return this.businessService.createRevenueGoal(
      businessId,
      createRevenueGoalDto,
    );
  }

  @Put(':businessId/revenue-goals/:revenueGoalId')
  async updateRevenueGoal(
    @Param('businessId') businessId: number,
    @Param('revenueGoalId') revenueGoalId: number,
    @Body() updateRevenueGoalDto: UpdateRevenueGoalDto,
  ) {
    return this.businessService.updateRevenueGoal(
      businessId,
      revenueGoalId,
      updateRevenueGoalDto,
    );
  }

  @Delete(':businessId/revenue-goals/:revenueGoalId')
  async removeRevenueGoal(
    @Param('businessId') businessId: number,
    @Param('revenueGoalId') revenueGoalId: number,
  ) {
    return this.businessService.removeRevenueGoal(businessId, revenueGoalId);
  }
}
