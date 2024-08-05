import { AppService } from './app.service';
import { Body, Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from './auth/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMetadata, getDownloadURL, getStorage, listAll, ref, uploadBytes } from '@firebase/storage';
import { firebaseApp } from './config/firebase.config';
import { v4 as uuidv4 } from 'uuid'; 
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) {
    cloudinary.config({
      cloud_name: 'de36c4nae',
      api_key: '954277844359195',
      api_secret: '1Bvv2xWocA6aIsp3QcfdxvzGWqs'
    })
  }
  @Get('api/docs')
  @Render('swagger')
  root() {
    return { title: 'Swagger' };
  }
  

  
  @Public()
  @Get()
  async getHello() {
    const storage = getStorage(firebaseApp);
     const storageRef = ref(storage, 'images');
      const images = await listAll(storageRef);
    
    // Get download URLs for each image
    const imageUrls = await Promise.all(images.items.map(async (imageRef) => {
      return getDownloadURL(imageRef);
    }));

    return imageUrls;
  }


  


  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) 
  async uploadImage(@UploadedFile() file) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }
      
      
      
      const storage = getStorage(firebaseApp);

      const storageRef = ref(storage, 'images/' + uuidv4());
      
      const metadata: UploadMetadata = {
        contentType: 'application/pdf'
      };

      await uploadBytes(storageRef, file.buffer, metadata);
      
      const imageUrl = await getDownloadURL(storageRef);
  
      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) 
  async uploadFile(@UploadedFile() image: Express.Multer.File): Promise<UploadApiErrorResponse | UploadApiResponse> {
   return new Promise<UploadApiErrorResponse | UploadApiResponse>(
    (resolve,reject) =>{
      const upload = cloudinary.uploader.upload_stream((error,result)=>
      {
        if(error) reject(error);
        resolve(result);
      })
      streamifier.createReadStream(image.buffer).pipe(upload);
    }
   )
  }

  @Public()
  @Post('send-sms')
  async sendSMS(@Body() body: { to: string, message: string }) {
    const { to, message } = body;
    await this.appService.sendSMS(to, message);
    return { success: true, message: 'SMS sent successfully' };
  }

 



}


