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
  ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./DTOs/create.task.dto";
import { GetTaskFilterDto } from "./DTOs/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./Pipes/task-status-validation.pipes";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) Id: number): Promise<Task> {
    return this.tasksService.getTaskByID(Id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Patch("/:id/status")
  UpdateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.UpdateTaskStatus(id, status);
  }

  @Delete("/:id")
  DeleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.DeteTaskById(id);
  }
}
