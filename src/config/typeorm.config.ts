import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { User } from '../auth/user.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://tanbin:zsv62PnrLU3tO9pmTmzsEPEutF8MLQa2@dpg-churual269vccp11b3ig-a.oregon-postgres.render.com/taskmanagement_dc8m',
  port: 5432,
  entities: [User, Task],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
