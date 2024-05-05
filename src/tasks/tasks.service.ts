    import { Injectable } from '@nestjs/common';
    import { Task, TaskStatus } from "./task.entity";
    import { UpdateTaskDto } from './dto/task.dto';
    import { TaskBD } from "../schemas/task.schema";
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    @Injectable()
    export class TasksService {

        constructor(@InjectRepository(TaskBD) private taskRepository: Repository<Task>){}

        getAllTasks() {
            return this.taskRepository.find();
        }

        getTaskById(id: string): Promise<Task> {
            return this.taskRepository.findOne({
                where: {
                    id
                }
            })
        }

        async getTaskByStatus(status: string): Promise<Task[]> {
            const taskStatus: TaskStatus = TaskStatus[status.toUpperCase() as keyof typeof TaskStatus];

            if (!taskStatus) {
                throw new Error('Estado de tarea no válido');
            }
            
            const tasks = await this.taskRepository.find({ where: { status: taskStatus } });
            return tasks;
        }

        async getDaysPassedTask(id: string): Promise<number> {
            const task = await this.taskRepository.findOne({ where: { id } });
        
            if (!task) {
                throw new Error('No se encontró la tarea con el ID proporcionado');
            }
            
            const currentDate = new Date();
            const differenceMs = currentDate.getTime() - task.creationDate.getTime();
            const daysPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        
            return daysPassed;
        }
        

        async createTasks(title: string, description: string):Promise<Task> {
            const task = {
                title,
                description,
                status: TaskStatus.PENDING,
                creationDate: new Date
            }
            const newTask = await this.taskRepository.create(task);
            return await this.taskRepository.save(newTask)
        }

        deleteTasks(id: string) {
            return this.taskRepository.delete({id})
        }

        updateTasks(id: string, updateFields: UpdateTaskDto) {
            return this.taskRepository.update({id}, updateFields);
        }

    }
