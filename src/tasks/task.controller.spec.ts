import { Test } from "@nestjs/testing";
import { TasksController } from "./tasks.controller"
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.entity";
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto";
import { ItaskRepository } from "./task.repository";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('TaskController tests', () => {
    let tasksController: TasksController;
    let tasksService: TasksService;
  let repositoryMock: Partial<ItaskRepository>;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                TasksService,
                { provide: 'repository', useValue: repositoryMock },
              ],
        }).compile();

        tasksService = moduleRef.get<TasksService>(TasksService);
        tasksController = moduleRef.get<TasksController>(TasksController);
    });

    it('should be defined', () => {
        expect(tasksController).toBeDefined();
    });

    describe('getAllTasks', () => {
        it('should return an array of tasks', async () => {
            const result: Task[] = [/* mock tasks array */];
            jest.spyOn(tasksService, 'getAllTasks').mockResolvedValue(result);

            expect(await tasksController.getAllTasks()).toBe(result);
        });
    });

    describe('getByID', () => {
        it('should return a task by ID', async () => {
            const taskId = '123';
            const result: Task = {
                id: "",
                title: "",
                description: "",
                status: TaskStatus.PENDING,
                creationDate: undefined
            };
            jest.spyOn(tasksService, 'getTaskById').mockResolvedValue(result);

            expect(await tasksController.getByID(taskId)).toBe(result);
        });
    });

    describe('getByStatus', () => {
        it('should return tasks by status', async () => {
            const status = TaskStatus.DONE;
            const result: Task[] = [/* mock tasks array */];
            jest.spyOn(tasksService, 'getTaskByStatus').mockResolvedValue(result);

            expect(await tasksController.getByStatus(status)).toBe(result);
        });
    });

    describe('getDaysPassed', () => {
        it('should return days passed for a task', async () => {
            const taskId = '123';
            const result = 5;
            jest.spyOn(tasksService, 'getDaysPassedTask').mockResolvedValue(result);

            expect(await tasksController.getDaysPassed(taskId)).toBe(result);
        });
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            const newTask: CreateTaskDto = {
                title: "",
                description: ""
            };
            const result: Task = {
                id: "",
                title: "",
                description: "",
                status: TaskStatus.PENDING,
                creationDate: undefined
            };
            jest.spyOn(tasksService, 'createTasks').mockResolvedValue(result);

            expect(await tasksController.createTask(newTask)).toBe(result);
        });
    });

    describe('deleteTask', () => {
    it('should delete a task', async () => {
        const taskId = '123';
        jest.spyOn(tasksService, 'deleteTasks').mockResolvedValue(undefined);
        const result = await tasksController.deleteTask(taskId);
        expect(result).toBeUndefined();
    });

    it('should throw an error if task does not exist', async () => {
        const taskId = '123';
        jest.spyOn(tasksService, 'deleteTasks').mockRejectedValue(new HttpException('Task not exist', HttpStatus.NOT_FOUND));
        
        await expect(tasksController.deleteTask(taskId)).rejects.toThrow(HttpException);
    });
    
});


    describe('updateTask', () => {
        it('should update a task', async () => {
            const taskId = '123';
            const updatedFields: UpdateTaskDto = {};
            const updateResult: Task = {
                id: "1",
                title: "First title",
                description: "First description",
                status: TaskStatus.PENDING,
                creationDate: undefined
            };

            jest.spyOn(tasksService, 'updateTasks').mockResolvedValue(updateResult);

            expect(await tasksController.updateTask(taskId, updatedFields)).toBe(updateResult);
        });
    });
})
