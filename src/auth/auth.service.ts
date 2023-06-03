import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpResponse } from '../common/http-response/http-response.common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    const result = await newUser.save();

    if (!result) {
      throw new NotAcceptableException('Unable to sign up at this moment');
    }
    return new HttpResponse(200, 'User created successfully').response;
  }
}
