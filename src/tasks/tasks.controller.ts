import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './DTOs/create.task.dto';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';
import { TaskStatusValidationPipe } from './Pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') Id: string): Task {
    return this.tasksService.getTaskByID(Id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Patch('/:id/status')
  UpdateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.UpdateTaskStatus(id, status);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') Id: string): string {
    return this.tasksService.DeteTaskById(Id);
  }
}
