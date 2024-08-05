import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard, RtGuard } from './common/guards';
import { Public } from './common/decorators/public.decorator';
import { GetCurrentUser } from './common/decorators/get-current-user.decorator';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto) : Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto) :Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('sendsmscode/:email')
  async sendsmscode(@Param('email') email: string)
  {
    return await this.authService.sendsmscode(email)
  }

  @Public()
  @Post('sendmailcode/:email')
  async sendmailcode(@Param('email') email: string)
  {
    return await this.authService.sendmailcode(email)
  }

  @Public()
  @Post('verifyCode/:email/:code')
  verifyCode(@Param('code') code: string,@Param('email') email: string)
  {
    return this.authService.verifyCode(code,email);
  }



  
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req : any) {
    const user = req.user;
    return this.authService.logout(user['sub'])
   
  }


  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req : any){
    const user = req.user;
   return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }



  
}

