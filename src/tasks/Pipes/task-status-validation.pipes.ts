import {
  PipeTransform,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    if (value) {
      value = value.toUpperCase();
    } else {
      throw new NotFoundException(`Value not provided`);
    }

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is a invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
