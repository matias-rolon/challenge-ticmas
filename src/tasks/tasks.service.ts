import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from "./task.entity";
import { UpdateTaskDto } from './dto/task.dto';
import { ItaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(@Inject('repository') private taskRepository: ItaskRepository) { }

    private validateStatus(status: TaskStatus): void {
        const taskStatus: TaskStatus = TaskStatus[status.toUpperCase() as keyof typeof TaskStatus];

        if (!taskStatus) {
            throw new Error('Invalid status');
        }
    }

    public async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.getAllTasks();
    }

    public async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.getTaskById(id)
        if (!task) {
            throw new HttpException('Task not exist', HttpStatus.NOT_FOUND);
        }
        return task
    }

    public async getTaskByStatus(status: TaskStatus): Promise<Task[]> {
        this.validateStatus(status);
        const tasks = await this.taskRepository.getTaskByStatus(status);
        return tasks;
    }

    public async getDaysPassedTask(id: string): Promise<number> {
        const task = await this.getTaskById(id);

        const currentDate = new Date();
        const differenceMs = currentDate.getTime() - task.creationDate.getTime();
        const daysPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

        return daysPassed;
    }


    public async createTasks(title: string, description: string): Promise<Task> {
        return await this.taskRepository.createTasks(title, description);
    }

    public async deleteTasks(id: string): Promise<void> {
        await this.getTaskById(id)
        await this.taskRepository.deleteTasks(id)
    }

    public async updateTasks(id: string, updateFields: UpdateTaskDto): Promise<Task> {
        if (updateFields.status) {
            this.validateStatus(updateFields.status);
        }
        await this.getTaskById(id)
        return await this.taskRepository.updateTasks(id, updateFields);
    }
}
