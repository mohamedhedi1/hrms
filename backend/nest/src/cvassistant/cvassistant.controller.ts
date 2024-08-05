import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators/public.decorator';
import { CvassistantService } from './cvassistant.service';
import { ResumeService } from './resume/resume.service';

@Controller('cvassistant')
export class CvassistantController {
    constructor(private cvassistantService: CvassistantService, private resumeService : ResumeService){}




    @Public()
    @Post("sendMessage/:threadId")
    async sendMesage(@Body() body: any  ,@Param('threadId') threadId: string)
    {
       const msg =await this.cvassistantService.sendMesage(body.message,threadId)
       return {msg : msg}
    }

    @Public()
    @Get()
    async createNewThread()
    {
      const thread =  await this.cvassistantService.createNewThread(); 
      return {thread : thread}
    }
   

    

}
