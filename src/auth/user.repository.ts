import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ConflictException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { HttpResponse } from '../common/http-response/http-response.common';
import { ErrorCode } from '../common/error-code/error-code.common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User(firstName, lastName, email, hashedPassword, salt);

    try {
      await newUser.save();
      return new HttpResponse(200, 'User created successfully').result;
    } catch (error) {
      switch (error.code) {
        case ErrorCode.CONFLICT_ERROR:
          throw new ConflictException(
            `A user with this email "${email}" already exists`,
          );
        default:
          throw new NotAcceptableException('Unable to sign up at this moment');
      }
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`Invalid credentials`);
    }

    console.log(await user.isPasswordValid(password));
    return await user.isPasswordValid(password);
  }
}
