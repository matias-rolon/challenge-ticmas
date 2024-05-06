import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskBD } from "../schemas/task.schema";
import { TasksTypeORM } from './task-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskBD])],
  controllers: [TasksController],
  providers: [TasksService, {
    provide: 'repository',
    useClass: TasksTypeORM
  }]
})
export class TasksModule {}
