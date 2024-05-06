import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    async getAllTasks(){
        return await this.tasksService.getAllTasks()
    }

    @Get(":id")
    async getByID(@Param('id') id: string) {
        try {
            return await this.tasksService.getTaskById(id);
        } catch (error) {
            if (error instanceof Error) {
                return new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("status/:status")
    async getByStatus(@Param('status') status: TaskStatus) {
        try {
            return await this.tasksService.getTaskByStatus(status)
        } catch (error) {
            if (error instanceof Error) {
                return new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(":id/days-passed")
    async getDaysPassed(@Param("id") id: string) {
        try {
            return await this.tasksService.getDaysPassedTask(id);
        } catch (error) {
            if (error instanceof Error) {
                return new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post()
    async createTask(@Body() newTask: CreateTaskDto): Promise<Task> {
        return await this.tasksService.createTasks(newTask.title, newTask.description)
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        try {
            await this.tasksService.deleteTasks(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(":id")
    async updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto) {
        try {
            return await this.tasksService.updateTasks(id, updatedFields);
        } catch (error) {
            if (error instanceof Error) {
                return new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
