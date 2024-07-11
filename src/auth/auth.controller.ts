import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/index';
import { LogInUserDto } from './dto/index';

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

  @Get()
  findAll() {
    return this._authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._authService.remove(+id);
  }
}
