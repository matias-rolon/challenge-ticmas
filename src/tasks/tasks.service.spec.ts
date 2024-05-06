import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskBD } from '../schemas/task.schema';
import { Task, TaskStatus } from './task.entity';
import { UpdateTaskDto } from './dto/task.dto';
import { ItaskRepository } from './task.repository';

describe('TasksService', () => {
  let service: TasksService;
  let repositoryMock: Partial<ItaskRepository>;

  beforeEach(async () => {
    repositoryMock = {
      getAllTasks: jest.fn(),
      getTaskById: jest.fn(),
      getTaskByStatus: jest.fn(),
      createTasks: jest.fn(),
      deleteTasks: jest.fn(),
      updateTasks: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: 'repository', useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: TaskStatus.PENDING,
          creationDate: new Date(),
        },
      ];
      jest.spyOn(repositoryMock, 'getAllTasks').mockResolvedValue(mockTasks);

      const result = await service.getAllTasks();

      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = '1';
      const mockTask: Task = {
        id: taskId,
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatus.PENDING,
        creationDate: new Date(),
      };
      jest.spyOn(repositoryMock, 'getTaskById').mockResolvedValue(mockTask);

      const result = await service.getTaskById(taskId);

      expect(result).toEqual(mockTask);
    });
  });

  describe('getTaskByStatus', () => {
    it('should return tasks by status', async () => {
      const status = TaskStatus.PENDING;
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: TaskStatus.PENDING,
          creationDate: new Date(),
        },
      ];
      jest
        .spyOn(repositoryMock, 'getTaskByStatus')
        .mockResolvedValue(mockTasks);

      const result = await service.getTaskByStatus(status);

      expect(result).toEqual(mockTasks);
    });

    it('should throw an error for invalid status', async () => {
      const invalidStatus = 'INVALID_STATUS' as TaskStatus;

      await expect(service.getTaskByStatus(invalidStatus)).rejects.toThrowError(
        'Invalid status',
      );
    });
  });

  describe('getDaysPassedTask', () => {
    it('should return number of days passed since task creation', async () => {
      const taskId = '1';
      const mockTask: Task = {
        id: taskId,
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatus.PENDING,
        creationDate: new Date(),
      };
      jest.spyOn(repositoryMock, 'getTaskById').mockResolvedValue(mockTask);

      const result = await service.getDaysPassedTask(taskId);

      expect(result).toBe(0);
    });

    it('should throw an error if task is not found', async () => {
      const taskId = '1';
      jest.spyOn(repositoryMock, 'getTaskById').mockResolvedValue(undefined);

      await expect(service.getDaysPassedTask(taskId)).rejects.toThrowError(
        'Task not exist',
      );
    });
  });

  describe('createTasks', () => {
    it('should create a new task', async () => {
      const title = 'New Task';
      const description = 'New Task Description';
      const mockTask: Task = {
        id: '1',
        title,
        description,
        status: TaskStatus.PENDING,
        creationDate: new Date(),
      };
      jest.spyOn(repositoryMock, 'createTasks').mockResolvedValue(mockTask);

      const result = await service.createTasks(title, description);

      expect(result).toEqual(mockTask);
    });
  });

  describe('deleteTasks', () => {
    it('should delete a task by ID', async () => {
      const taskId = '1';
      const taskToDelete: Task = {
        id: taskId,
        title: 'Task to delete',
        description: 'Description',
        status: TaskStatus.PENDING,
        creationDate: new Date(),
      };

      jest.spyOn(repositoryMock, 'getTaskById').mockResolvedValue(taskToDelete);
      jest.spyOn(repositoryMock, 'deleteTasks').mockResolvedValue(undefined);

      await expect(service.deleteTasks(taskId)).resolves.toBeUndefined();
      expect(repositoryMock.getTaskById).toHaveBeenCalledWith(taskId);
      expect(repositoryMock.deleteTasks).toHaveBeenCalledWith(taskId);
    });
  });

  describe('updateTasks', () => {
    it('should update a task by ID', async () => {
      const taskId = '1';
      const task: Task = {
        id: taskId,
        title: 'Task to delete',
        description: 'Description',
        status: TaskStatus.PENDING,
        creationDate: new Date(),
      };

      const taskUpdate: Task = {
        id: taskId,
        title: 'Task to delete',
        description: 'Description',
        status: TaskStatus.DONE,
        creationDate: new Date(),
      };

      const updateFields: UpdateTaskDto = { status: TaskStatus.DONE };

      jest.spyOn(repositoryMock, 'getTaskById').mockResolvedValue(task);
      jest.spyOn(repositoryMock, 'updateTasks').mockResolvedValue(taskUpdate);

      const result = await service.updateTasks(taskId, updateFields);

      expect(result).toEqual(taskUpdate);
    });
  });
});