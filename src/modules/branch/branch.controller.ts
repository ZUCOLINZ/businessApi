import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateBranchDto } from '../dtos/UpdateBranch';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async getBranch() {
    return await this.branchService.findBranch();
  }

  @Get(':id')
  async getBranchById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateBranchDto: UpdateBranchDto,
  ) {
    const result = await this.branchService.findOneBranch(id);

    res.json({ msg: 'found branch ', result });
  }

  @Put(':id')
  async updateBranchById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateBranchDto: UpdateBranchDto,
  ) {
    const result = await this.branchService.updateBranch(id, UpdateBranchDto);

    res.json({ msg: 'Branch Updated Successfully', result });
  }

  @Delete(':id')
  async deleteBranchById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.branchService.deleteBranchById(id);
    res.json({ msg: 'Profile deleted successfully' });
  }
}
