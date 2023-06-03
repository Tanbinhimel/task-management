import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  // async signUp(signUpDto: SignUpDto) {
  //   console.log('service is ok');
  //   // await this.userRepository.signUp(signUpDto);
  //   await this.userRepository.test();
  //   // return this.userRepository.signUp(signUpDto);
  // }

  // async signUp(signUpDto: SignUpDto) {
  //   const { email, password, firstName, lastName } = signUpDto;
  //   const newUser = new User();
  //   newUser.firstName = firstName;
  //   newUser.lastName = lastName;
  //   newUser.email = email;
  //   newUser.password = password;
  //   console.log(new HttpResponse(300, 'its working', 'no error').response);
  //   const result = await newUser.save();
  //   console.log(result);
  //
  //   // await this.userRepository.save(newUser);
  // }
}
