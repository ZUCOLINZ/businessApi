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

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

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
}
