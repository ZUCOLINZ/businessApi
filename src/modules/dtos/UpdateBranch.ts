import { IsString } from 'class-validator';

export class UpdateBranchDto {
  @IsString()
  branchName: string;

  @IsString()
  postalCode: string;

  @IsString()
  address: string;
}
