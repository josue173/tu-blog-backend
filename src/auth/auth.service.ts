import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LogInUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this._userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), // Hash de una sola vía
      });
      await this._userRepository.save(user);
      delete user.password;
      // TO DO: retornar JWT de acceso
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LogInUserDto) {
    const { password, email } = loginUserDto;
    const user = await this._userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');
    return user;
    // TO DO: retornar JWT
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Check logs');
  }
}
