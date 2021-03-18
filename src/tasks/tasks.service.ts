import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './DTOs/create.task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }

  CreateTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  DeteTaskById(id: string): string {
    // not the best way to delete but this is not a database so we can have some liberty
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'Deleted the entry';
  }

  UpdateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
