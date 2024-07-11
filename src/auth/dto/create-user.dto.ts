import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  user_password: string;
  @IsDate()
  @Type(() => Date) // yyyy-MM-dd
  user_date_of_birthday: Date;
}
