import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  //testing twillio 
  private readonly client: Twilio.Twilio

  constructor() {
    this.client = Twilio("AC2398e2497d77b98accc6f7cbed706229", "3364a777558b382b95f31835e206353a");
  }

  async sendSMS(to: string, message: string) {
    try {
      await this.client.messages.create({
        body: "hello",
        from: "+12563226071", // Make sure you have TWILIO_PHONE_NUMBER set in your environment variables
        to : "+21693016394"
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }
}
