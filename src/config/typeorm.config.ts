import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { User } from '../auth/user.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  entities: [User, Task],
  synchronize: true,
};
