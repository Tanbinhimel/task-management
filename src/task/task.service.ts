import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskList(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    const { status, search } = filterTaskDto;

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
    const task: Task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
    return task;
  }

  async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = status;

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
