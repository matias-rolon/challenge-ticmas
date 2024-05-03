import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskBD } from 'src/schemas/task.schema';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks()
    }

    @Get(":id")
    getByID(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    } 

    @Get("status/:status")
    getByStatus(@Param('status') status: string) {
        return this.tasksService.getTaskByStatus(status)
    }

    @Get(":id/days-passed")
    getDaysPassed(@Param("id") id: string) {
        return this.tasksService.getDaysPassedTask(id);
    }


    @Post()
    createTask(@Body() newTask: CreateTaskDto): Promise<Task> {
        console.log(newTask);
        return this.tasksService.createTasks(newTask.title, newTask.description)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTasks(id);
    }

    @Patch(":id")
    updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto) {
        return this.tasksService.updateTasks(id, updatedFields);
    }

}
