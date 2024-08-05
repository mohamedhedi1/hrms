import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResumeService } from './resume/resume.service';
@Injectable()
export class CvassistantService {
    openai: OpenAI;
    constructor(private prisma: PrismaService, private resumeService : ResumeService){
        this.openai =new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async createNewThread() {
        const thread = await this.openai.beta.threads.create();
        await this.prisma.thread.create({
            data : {
                threadId: thread.id
            } 
        })
        return thread.id

    }
    async sendMesage(message: string, threadId : string) {
        //add user msg 
       const userMessage =await this.openai.beta.threads.messages.create(threadId, {
        role : "user",
        content : message
       })
       
       /*await this.prisma.message.create({
        data : {
            content : message,
            role : "user",
            threadId: threadId
        }
       })*/

       // assistance answer  (run)
       const run =await this.openai.beta.threads.runs.createAndPoll(threadId,
        {
            assistant_id : "asst_KZ6SO4BavKcZ4NJyBh75R0vw",
        }
       )
       if (run.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(
          run.thread_id
        );
        for (const message1 of messages.data) {
            if (message1.content[0].type === 'text') {
                
                
                /*await this.prisma.message.create({
                    data : {
                        role : "model",
                        content : message1.content[0].text.value,
                        threadId : threadId
                    }
                })*/
                //generate cv and apply 
                // to add
                if(message === "generate cv" && message1.content[0].text.value.length > 300)
                    {
                        const pdfFile = this.resumeService.processTextToPdfAndUpload(message1.content[0].text.value)
                        await this.prisma.resume.create({
                            data : {
                                url : (await pdfFile).fileUrl
                            }
                        })
                        return `Submitted your application and this is your cv link ${(await pdfFile).fileUrl}` 

                    }

                return message1.content[0].text.value;
                
            } else {
                console.log('Content is not a text type.');
            }
         
        }
      } else {
        console.log(run.status);
      }

     
    }



}
