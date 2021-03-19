import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './DTOs/create.task.dto';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    // if there is a status string to filter the task user needs
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
      return tasks;
    }
    // if there is a search string to filter the task user needs
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
      return tasks;
    }
  }

  getTaskByID(id: string): Task {
    const found = this.tasks.find((task) => task.id == id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
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
    const found = this.getTaskByID(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return 'Deleted the entry..... ';
  }

  UpdateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
