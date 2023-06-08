import { IsIn, IsNotEmpty } from 'class-validator';
import { allowedTaskStatusArray, TaskStatus } from '../utils/task-status.enum';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsIn(allowedTaskStatusArray)
  status: TaskStatus;

  @IsNotEmpty()
  userId: number;
}
