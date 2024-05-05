import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskBD } from '../schemas/task.schema';
import { Task, TaskStatus } from './task.entity';
import { UpdateTaskDto } from './dto/task.dto';

describe('TasksService', () => {
    let service: TasksService;
    let taskRepository: Repository<Task>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(TaskBD),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        taskRepository = module.get<Repository<Task>>(getRepositoryToken(TaskBD));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllTasks', () => {
        it('should return an array of tasks', async () => {
            const mockTasks: Task[] = [{ id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.PENDING, creationDate: new Date() }];
            jest.spyOn(taskRepository, 'find').mockResolvedValue(mockTasks);

            const result = await service.getAllTasks();

            expect(result).toEqual(mockTasks);
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const taskId = '1';
            const mockTask: Task = { id: taskId, title: 'Task 1', description: 'Description 1', status: TaskStatus.PENDING, creationDate: new Date() };
            jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask);

            const result = await service.getTaskById(taskId);

            expect(result).toEqual(mockTask);
        });
    });


    describe('getTaskByStatus', () => {
        it('should return tasks by status', async () => {
            const status = 'PENDING';
            const mockTasks: Task[] = [{ id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.PENDING, creationDate: new Date() }];
            jest.spyOn(taskRepository, 'find').mockResolvedValue(mockTasks);

            const result = await service.getTaskByStatus(status);

            expect(result).toEqual(mockTasks);
        });

        it('should throw an error for invalid status', async () => {
            const invalidStatus = 'INVALID_STATUS';

            await expect(service.getTaskByStatus(invalidStatus)).rejects.toThrowError('Estado de tarea no válido');
        });
    });

    describe('getDaysPassedTask', () => {
        it('should return number of days passed since task creation', async () => {
            const taskId = '1';
            const mockTask: Task = { id: taskId, title: 'Task 1', description: 'Description 1', status: TaskStatus.PENDING, creationDate: new Date() };
            jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask);

            const result = await service.getDaysPassedTask(taskId);

            expect(result).toBe(0);
        });

        it('should throw an error if task is not found', async () => {
            const taskId = '1';
            jest.spyOn(taskRepository, 'findOne').mockResolvedValue(undefined);

            await expect(service.getDaysPassedTask(taskId)).rejects.toThrowError('No se encontró la tarea con el ID proporcionado');
        });
    });

    describe('createTasks', () => {
        it('should create a new task', async () => {
            const title = 'New Task';
            const description = 'New Task Description';
            const mockTask: Task = { id: '1', title, description, status: TaskStatus.PENDING, creationDate: new Date() };
            jest.spyOn(taskRepository, 'create').mockReturnValue(mockTask);
            jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask);

            const result = await service.createTasks(title, description);

            expect(result).toEqual(mockTask);
        });
    });

    describe('deleteTasks', () => {
        it('should delete a task by ID', async () => {
            const taskId = '1';
            const deleteResult: DeleteResult = {
                raw: null,
                affected: 1
            };
            jest.spyOn(taskRepository, 'delete').mockResolvedValue(deleteResult);

            const result = await service.deleteTasks(taskId);

            expect(result).toEqual(deleteResult);
        });
    });

    describe('updateTasks', () => {
        it('should update a task by ID', async () => {
            const taskId = '1';
            const updateFields: UpdateTaskDto = { status: TaskStatus.DONE };
            const updateResult:UpdateResult = {
                raw: null, 
                affected: 1,
                generatedMaps: []
            };
            jest.spyOn(taskRepository, 'update').mockResolvedValue(updateResult);

            const result = await service.updateTasks(taskId, updateFields);

            expect(result).toEqual(updateResult);
        });
    });
});
