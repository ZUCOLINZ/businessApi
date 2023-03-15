import { IsEmail, IsString } from 'class-validator';

export class UpdateBusinessDto {
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
