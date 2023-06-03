import { allowedTaskStatusArray, TaskStatus } from '../utils/task-status.enum';
import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  @IsIn(allowedTaskStatusArray)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
