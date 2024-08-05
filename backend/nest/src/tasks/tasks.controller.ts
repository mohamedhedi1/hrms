import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { title } from 'process';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: Task): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.tasksService.findOne(title);
  }

  @Put(':title')
  update(@Param('title') title: string, @Body() updateTaskDto: Task) {
    return this.tasksService.update(title, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Put(':title/:email')
  assignTaskTo(@Param('title') title: string, @Param('email') email: string) {
    return this.tasksService.assignTaskTo(title, email);
  }
}
