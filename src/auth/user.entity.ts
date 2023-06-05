import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    salt: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.salt = salt;
  }

  async isPasswordValid(password: string): Promise<boolean> {
    return (await bcrypt.hash(password, this.salt)) === this.password;
  }
}
