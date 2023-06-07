import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { User } from '../auth/user.entity';
import * as config from 'config';
import * as process from 'process';

const dbConfig = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  port: process.env.RDS_PORT || dbConfig.port,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DATABASE || dbConfig.database,
  entities: [User, Task],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  ssl: {
    rejectUnauthorized: false,
  },
};
