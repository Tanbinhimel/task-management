import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private dataSource: DataSource,
  ) {}

  async getTaskList(
    userId: number,
    filterTaskDto: FilterTaskDto,
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    const { status, search } = filterTaskDto;

    query.andWhere('task.userId = :userId', { userId });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const taskList = await query.getMany();

    if (!taskList) {
      throw new NotFoundException('Unable to find task list');
    }

    return taskList;
  }

  async getTaskById(id: number): Promise<Task> {
    const query = this.dataSource
      .getRepository(Task)
      .createQueryBuilder('task');
    const task = await query
      .andWhere('task.id = :id', { id })
      .leftJoinAndSelect('task.user', 'user')
      .getOne();

    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    if (task.user) {
      delete task.user.password;
      delete task.user.salt;
    }
    return task;
  }

  async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, userId } = createTaskDto;
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Invalid user id');
    }

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = status;
    newTask.user = user;

    const newlyCreatedTask = await this.taskRepository.save(newTask);

    if (!newlyCreatedTask) {
      throw new NotAcceptableException('Unable to create task');
    }
    return newlyCreatedTask;
  }

  async deleteTask(id: number): Promise<object> {
    const result: DeleteResult = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Unable to find Task with Id ${id}`);
    }
    return {
      statusCode: 200,
      message: `Task with id ${id} successfully deleted`,
    };
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const task = await this.getTaskById(id);
    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (status) {
      task.status = status;
    }

    return await this.taskRepository.save(task);
  }
}
