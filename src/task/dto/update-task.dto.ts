import { allowedTaskStatusArray, TaskStatus } from '../utils/task-status.enum';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsIn(allowedTaskStatusArray)
  status: TaskStatus;
}
