import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service"
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { TaskBD } from "../schemas/task.schema";
import { Repository } from "typeorm";
import { Task, TaskStatus } from "./task.entity";

describe("Task Service test", () => {
    let service: TasksService;
    let taskRepository: Repository<TaskBD>

    const USER_REPOSITORY_TOKEN = getRepositoryToken(TaskBD)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({          
            providers: [TasksService, 
                {
                    provide: USER_REPOSITORY_TOKEN,
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        taskRepository = module.get<Repository<TaskBD>>(getRepositoryToken(TaskBD))
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });

    it("userRepository should be defined", () => {
        expect(taskRepository).toBeDefined();
    });

    
        it('should create a new task', async () => {
            const mockTask = { id: '1', title: 'Test title', description: 'Test description', status: TaskStatus.PENDING, creationDate: new Date() };
            const result = await service.createTasks("Test title", "Test description");
            expect(result).toEqual(mockTask);
        })
    
        it('should return all tasks', async () => {
            const mockTasks: Task[] = [{ id: '1', title: 'Task 1', description: 'Description 1', status: TaskStatus.PENDING, creationDate: new Date() }];
       
            const result = await service.getAllTasks();
            console.log(result)
            expect(result).toEqual(mockTasks);
        });
});