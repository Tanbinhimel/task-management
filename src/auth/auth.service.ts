import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from './user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from '../common/http-response/http-response.common';
import { HttpResponseCode } from '../common/http-response/http-response-code.common';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(signUpDto: SignUpDto) {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.signIn(signInDto);
    const { id, email, firstName, lastName } = user;
    const accessToken = this.jwtService.sign({
      id,
      email,
      firstName,
      lastName,
    });
    return new HttpResponse(
      HttpResponseCode.SUCCESS,
      'user sign in successful',
      { accessToken },
    ).result;
  }
}
