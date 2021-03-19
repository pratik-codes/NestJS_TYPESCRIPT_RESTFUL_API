import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
  providers: [TasksService],
})
export class AppModule {}
