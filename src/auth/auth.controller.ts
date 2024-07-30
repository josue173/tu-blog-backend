import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/index';
import { LogInUserDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { validRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this._authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LogInUserDto) {
    return this._authService.login(loginUserDto);
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(@Req() request: Express.Request, @GetUser() user: User) {
  // console.log({ user: request.user });
  // console.log({ user });
  // return 'hi';
  // }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    // console.log(request);
    // console.log(rawHeaders);

    return { user, userEmail, rawHeaders, headers };
  }

  // @SetMetadata('roles', ['admin', 'super-user'])
  @Get('private2')
  @RoleProtected(validRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @RoleProtected(validRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
