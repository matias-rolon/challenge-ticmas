import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../tasks/task.entity";

@Entity({ name: 'tasks' })
export class TaskBD {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ nullable: true })
    status: TaskStatus

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date
}