import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from "./task.entity";
import { UpdateTaskDto } from './dto/task.dto';
import { TaskBD } from "../schemas/task.schema";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItaskRepository } from './task.repository';

@Injectable()
export class TasksTypeORM implements ItaskRepository {

    constructor(@InjectRepository(TaskBD) private taskRepository: Repository<Task>) { }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTaskById(id: string): Promise<Task | undefined | null> {
        return await this.taskRepository.findOne({
            where: {
                id
            }
        })
    }

    async getTaskByStatus(status: TaskStatus): Promise<Task[]> {

        const tasks = await this.taskRepository.find({ where: { status } });
        return tasks;
    }

    async createTasks(title: string, description: string): Promise<Task> {
        const task = {
            title,
            description,
            status: TaskStatus.PENDING,
            creationDate: new Date
        }
        const newTask = this.taskRepository.create(task);
        return await this.taskRepository.save(newTask)
    }

    async deleteTasks(id: string): Promise<void> {
        await this.taskRepository.delete({ id })
    }

    async updateTasks(id: string, updateFields: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update({ id }, updateFields);
        return await this.getTaskById(id);
    }

}
