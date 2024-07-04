import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

// Como espero que venga la información
export class CreateUsuarioDto {
  @IsString()
  @MinLength(5)
  username: string;
  @IsString()
  user_first_name: string;
  @IsString()
  user_last_name: string;
  @IsString()
  @IsEmail()
  user_email: string;
  @IsString()
  @MinLength(8)
  user_password: string;
  @IsDate()
  @Type(() => Date) // yyyy-MM-dd
  user_date_of_birthday: Date;
}
