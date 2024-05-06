import { UpdateTaskDto } from "./dto/task.dto";
import { Task, TaskStatus } from "./task.entity";

export interface ItaskRepository {
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task | undefined | null>;
    getTaskByStatus(status: TaskStatus): Promise<Task[]>;
    createTasks(title: string, description: string): Promise<Task>;
    deleteTasks(id: string): Promise<void>;
    updateTasks(id: string, updateFields: UpdateTaskDto): Promise<Task>;
}