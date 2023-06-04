import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from './user.repository';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(signUpDto: SignUpDto) {
    return this.userRepository.signUp(signUpDto);
  }

  signIn(signInDto: SignInDto) {
    return this.userRepository.signIn(signInDto);
  }
}
