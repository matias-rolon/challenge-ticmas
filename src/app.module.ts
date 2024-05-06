import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskBD } from "./schemas/task.schema";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'mati',
      password: 'password',
      database: 'db',
      entities: [TaskBD],
      synchronize: true
    }), 
    TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
