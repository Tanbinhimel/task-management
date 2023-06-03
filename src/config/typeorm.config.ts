import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true,
};
