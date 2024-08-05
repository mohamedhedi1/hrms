import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/common/decorators/public.decorator';
import { PermissionsGuard } from 'src/auth/common/guards/permissions.guard';
import { RegisterRequest } from './dtos/RegisterRequest.dto';
import { Observable } from 'rxjs';
import { Userprofile } from './dtos/Userprofile';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //@UseGuards(PermissionsGuard)
  // @SetMetadata('authorities', ['ADD::ROLE'])
  // @UseGuards(PermissionsGuard)
  //@SetMetadata('authorities', ['READ::USER'])
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('UserPrivilegesByEmail/:email')
  getUserPrivilegesByEmail(@Param('email') email: string) {
    return this.usersService.getUserAndPrivileges(email);
  }

  @Post('assignRoleToUser')
  async assignRole(@Body() body: { userId: string; roleId: string }) {
    try {
      await this.usersService.assignRoleToUser(body.userId, body.roleId);
      return { success: true, message: 'Role assigned to user successfully' };
    } catch (error) {
      console.error('Error assigning role to user:', error);
      throw error;
    }
  }

  //@UseGuards(PermissionsGuard)
  //@SetMetadata('authorities', ['ADD::USER'])
  @Post()
  addUser(@Body() registerRequest: RegisterRequest) {
    console.log(registerRequest);
    return this.usersService.addUser(registerRequest);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<Userprofile> {
    return this.usersService.getUserByEmail(email);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deteteUser(@Param('id') id: string) {
    return this.usersService.deteteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: any) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }

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
  @Get('settings/:email')
  async settings(@Param('email') email: string){
    return await this.usersService.getSettings(email);
  }
  @Patch('settings/:email')
  async setSettings(@Param('email') email: string,@Body() body : any){
    return await this.usersService.setSettings(email,body);
  }


  @Patch('uploadImage/:email')
  async uploadImage(@Param('email') email: string, @Body() body : any)
  {
    return await this.usersService.uploadImage(email,body.image);

  }
}
