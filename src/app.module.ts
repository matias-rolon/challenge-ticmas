import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskBD } from "./schemas/task.schema";
import { config } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get("db").host,
          port: configService.get('db').port,
          username: configService.get('db').username,
          password: configService.get('db').password,
          database: configService.get('db').db,
          entities: [TaskBD],
          synchronize: true
        }
      }
    }),
    TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
