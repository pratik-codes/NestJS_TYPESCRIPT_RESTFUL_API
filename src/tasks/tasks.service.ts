import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from "./DTOs/create.task.dto";
import { GetTaskFilterDto } from "./DTOs/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async CreateTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.CreateTask(createTaskDto);
  }

  async DeteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async UpdateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    await task.save();
    return task;
  }
}
