import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { get } from 'node:https';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './DTOs/create.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') Id: string): Task {
    return this.tasksService.getTaskByID(Id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Put('/:id/status')
  UpdateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.UpdateTaskById(id, status);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') Id: string): string {
    return this.tasksService.DeteTaskById(Id);
  }
}
