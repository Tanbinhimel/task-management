import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard())
  getTaskList(
    @Query(ValidationPipe) filterTaskDto: FilterTaskDto,
    @Req() req,
  ): Promise<Task[]> {
    console.log('req', req.user);
    return this.taskService.getTaskList(req.user.id, filterTaskDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createNewTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.taskService.deleteTask(id);
  }
}
