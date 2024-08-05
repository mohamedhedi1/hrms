import { User } from "@prisma/client"

enum TaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED
  }
  
  enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH
  }

export class Task {
    id :        string       
  title    :   string 
  description?: string
  priority :   TaskPriority
  status  :    TaskStatus
  createBy :   string
  createdAt :  Date     
  updatedAt :  Date 
 assignedTo  : User  
 assignedToEmail? :string
}
