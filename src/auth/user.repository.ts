import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { ConflictException, NotAcceptableException } from '@nestjs/common';
import { HttpResponse } from '../common/http-response/http-response.common';
import { ErrorCode } from '../common/error-code/error-code.common';

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;
    const newUser = new User(firstName, lastName, email, password);

    try {
      await newUser.save();
      return new HttpResponse(200, 'User created successfully').result;
    } catch (error) {
      switch (error.code) {
        case ErrorCode.CONFLICT_ERROR:
          throw new ConflictException(
            `A user with this email ${email} already exists`,
          );
        default:
          throw new NotAcceptableException('Unable to sign up at this moment');
      }
    }
  }
}
