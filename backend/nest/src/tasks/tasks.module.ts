import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "noreply.pfe.2022@gmail.com",
        pass: "ohqckfohycjdtdff", // Use the Gmail app password
      },
    }
  })],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {
  
}
