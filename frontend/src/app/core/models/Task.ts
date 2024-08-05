import { User } from './User';

export class Task {
  id!: string; 
  title!: string;
  description!: string;
  priority!: TaskPriority;
  status!: TaskStatus;
  createBy!: string;
  createdAt!: Date;
  deadline!: Date;
  updatedAt!: Date;
  assignedToEmail!: string
}

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
