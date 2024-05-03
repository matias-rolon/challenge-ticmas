import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskBD } from 'src/schemas/task.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TaskBD])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
