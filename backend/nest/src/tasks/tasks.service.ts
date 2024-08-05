import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {  Prisma, Task, TaskPriority } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService , private mailerService: MailerService) {}

  async createTask(createTaskDto: Task): Promise<Task> {
    try {
      const { title, description, priority, status, createBy, assignedToEmail } = createTaskDto;

      // Find the user by their email
      const assignedUser = await this.prisma.user.findUnique({
        where: {
          email: assignedToEmail, // Use assignedToEmail to find the user by their email
        },
      });

      if (!assignedUser) {
        throw new Error(`The user with email '${assignedToEmail}' does not exist.`);
      }

      // Create the task and connect it to the user
      const createdTask = await this.prisma.task.create({
        data: {
          title,
          description,
          priority,
          status,
          createBy,
          assignedTo: {
            connect: {
              email: assignedToEmail, // Connect the task to the user by their email
            },
          },
        },
        include: {
          assignedTo: true, // Include the assigned user information in the response
        },
      });
this.sendmail(createdTask.assignedToEmail, createdTask.title)
      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }


  async update(title: string, updateTaskDto: Task): Promise<Task | any> {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { title: title },
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          priority: updateTaskDto.priority ,
          status: updateTaskDto.status  ,
          createBy: updateTaskDto.createBy,
        },
        select: {
          id: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        },
      });
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }


  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.task.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }

  async assignTaskTo(title: string, assignedToEmail: string): Promise<Task | null> {
    try {
    // Vérifier si la tâche existe
    const task = await this.prisma.task.findUnique({
      where: {
        title,
      },
    });

    if (!task) {
      throw new Error(`La tâche avec le titre ${title} n'existe pas.`);
    }

    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: {
        email: assignedToEmail,
      },
    });

    if (!user) {
      throw new Error(`L'utilisateur avec l'email ${assignedToEmail} n'existe pas.`);
    }

    // Mettre à jour la tâche avec l'email de l'utilisateur assigné
    const updatedTask = await this.prisma.task.update({
      where: {
        title, // Assuming title is used to uniquely identify the task
      },
      data: {
        assignedTo: {
          connect: {
            email :  assignedToEmail ,   }, 
        },
      },
    });

    return updatedTask;
  }
  catch (error) {
    console.error('Error assigning task:', error);
    throw new Error('Failed to assign task');
  }
}

    async findOne(title: string): Promise<Task | string> {
    try {
      const record = await this.prisma.task.findFirst({
        where: { title: title }, // Search for the task by its title
        include: { assignedTo: true }, // Include any related entities if necessary
      });
  
      if (!record) {
        return 'Task with this title: ' + title + ' Not found';
      }
  
      return record;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
  sendmail(email: string, code: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'noreply.pfe.2022@gmail.com',
      subject: 'Assigned task',
      //text : 'this is your password' +password,
      html:
        '<html>' +
        '\n' +
        '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">\n' +
        '    <!--100% body table-->\n' +
        '    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"\n' +
        '        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: \'Open Sans\', sans-serif;">\n' +
        '        <tr>\n' +
        '            <td>\n' +
        '                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"\n' +
        '                    align="center" cellpadding="0" cellspacing="0">\n' +
        '                    <tr>\n' +
        '                        <td style="height:80px;">&nbsp;</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td style="text-align:center;">\n' +
        '                          <a href="' +
        '" title="logo" target="_blank">\n' +
        '                            <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">\n' +
        '                          </a>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td style="height:20px;">&nbsp;</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>\n' +
        '                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"\n' +
        '                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">\n' +
        '                                <tr>\n' +
        '                                    <td style="height:40px;">&nbsp;</td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <td style="padding:0 35px;">\n' +
        '                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:\'Rubik\',sans-serif;">\n' +
        '                                            Welcome to HRMS</h1>\n' +
        '                                        <span\n' +
        '                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>\n' +
        '                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">\n' +
        ' Hello,\n' +
        '\n' +
        ' \n' +
        '\n' +
        'you got a new task: ' +
        code +
        '.\n' +
        '\n' +
        ' \n' +
        '\n' +
        '                                        </p>\n' +
        '                                    </td>\n' +
        '                                </tr>\n' +
        '                                <tr>\n' +
        '                                    <td style="height:40px;">&nbsp;</td>\n' +
        '                                </tr>\n' +
        '                            </table>\n' +
        '                        </td>\n' +
        '                    <tr>\n' +
        '                        <td style="height:20px;">&nbsp;</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td style="text-align:center;">\n' +
        '                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>HRMS</strong></p>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td style="height:80px;">&nbsp;</td>\n' +
        '                    </tr>\n' +
        '                </table>\n' +
        '            </td>\n' +
        '        </tr>\n' +
        '    </table>\n' +
        '    <!--/100% body table-->\n' +
        '</body>\n' +
        '\n' +
        '</html>',
    });
  }




}
 

  
  /*async findOne(id: string): Promise<Task | string> {
    try {
      const record = await this.prisma.task.findUnique({
        where: { id: id },
        include: { users: true }, // Include any related entities if necessary
      });
      /*select: {
          id: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        }
      });

      if (!record) {
        return 'Task with this id : ' + id + ' Not found';
      }

      return record;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }*/
