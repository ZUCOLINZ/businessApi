import { IsEmail, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  businessName: string;

  @IsString()
  businessPhone: string;

  @IsEmail()
  businessEmail: string;

  @IsString()
  city: string;

  @IsString()
  location: string;
}
