import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jstLogin(data: LoginRequestDto) {
    const { email, password } = data;

    // Email validation
    const cat = await this.CatsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException(
        '이메일과 비밀번호를 다시 한 번 확인해주세요.',
      );
    }

    // Password validation
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException(
        '이메일과 비밀번호를 다시 한 번 확인해주세요.',
      );
    }

    const payload = { email: email, password: password };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
