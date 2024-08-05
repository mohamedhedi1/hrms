export class Task {
    taskId !: string;
    title !: string;
    description!: string;
    priority!: TaskPriority;
    status!: TaskStatus;
    createBy!: string;
    createdAt!: Date;
    //usersIDs!: string[];
    //users!: User[];
}

 enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

 enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}
