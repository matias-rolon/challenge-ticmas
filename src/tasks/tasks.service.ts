import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from "./task.entity";
import { v4 } from "uuid";
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [{
        id: '1',
        title: 'frist task', 
        description: 'This is a description',
        status: TaskStatus.PENDING,
        creationDate: new Date(),
    }]

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    getTaskByStatus(status: string): Task[] {
        return this.tasks.filter(task => task.status === status);
    }
    getDaysPassedTask(id: string): number {
        const task = this.tasks.find(task => task.id === id);
    
        const creationDate = new Date(task.creationDate);
        const currentDate = new Date();
        
        const creationDateMs = creationDate.getTime();
        const currentDateMs = currentDate.getTime();
        
        const differenceMs = currentDateMs - creationDateMs;
        
        const daysPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        
        return daysPassed;
    }
    

    createTasks(title: string, description: string): Task {
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.PENDING,
            creationDate: new Date
        }
        this.tasks.push(task);

        return task;
    }

    deleteTasks(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTasks(id: string, updateFields: UpdateTaskDto): Task {
        const task = this.getTaskById(id)
        const newTask = Object.assign(task, updateFields);
        this.tasks = this.tasks.map(task => task.id === id ? newTask : task)
        return newTask;
    }

}
