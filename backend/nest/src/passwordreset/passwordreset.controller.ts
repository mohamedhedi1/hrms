import { BadRequestException, Body, Controller, Post, Query, Res } from '@nestjs/common';
import { PasswordresetService } from './passwordreset.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Public } from 'src/auth/common/decorators/public.decorator';

@Controller('passwordreset')
export class PasswordresetController {

    constructor(private passwordResetService : PasswordresetService,
         ){}

    @Public()
    @Post('request')
    async requestPasswordReset(@Query('email') email: string) : Promise<string> {
        return this.passwordResetService.requestPasswordReset(email);
    }

    @Public()
    @Post('reset')
    async resetPassword (
        @Query('token') token: string,
        @Query('password') newPassword: string)
    {
        return this.passwordResetService.resetPassword(token,newPassword);
    }



}
