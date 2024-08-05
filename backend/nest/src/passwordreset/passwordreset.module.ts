import { Module } from '@nestjs/common';
import { PasswordresetController } from './passwordreset.controller';
import { PasswordresetService } from './passwordreset.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports :[
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: "noreply.pfe.2022@gmail.com",
          pass: "ohqckfohycjdtdff", 
        },
      }
    })
  ],
  controllers: [PasswordresetController],
  providers: [PasswordresetService]
})
export class PasswordresetModule {}
