import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as Twilio from 'twilio';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    private readonly client: Twilio.Twilio
  
  constructor(
    private prisma: PrismaService,
    private jwtService : JwtService,
    private mailerService: MailerService
    
  ) {
    const sid = "AC8e69b3895372eec70f9a4da0bd31bdf0"
    const auth = "1437ce0fc979b5b9a9ed2ffb533c88a6"
    this.client = Twilio(sid, auth);
  }
  

   generateSixDigitCode(): string {
    const min = 100000; 
    const max = 999999; 
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
    } 

    async verifyCode(code: string, email: string) {
      const verificationCode = await this.prisma.verificationCode.findFirst(
        {
            where : {
                code : code,
                email : email
            }
        }
       );
       if(!verificationCode)
        {
            throw new NotFoundException('Code not found');
        }
        if ( new Date(verificationCode.expiryDate) < new Date()) {
            throw new BadRequestException(' Code has expired');
          }
          await this.deleteCode(email);
          //success

          const  user = await this.prisma.user.findUnique(
            {
                where : {
                    email : email
                }
            }
        )
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateAtHash(user.id, tokens.access_token);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
          

      }

    async deleteCode(email:string)
    {
        await this.prisma.verificationCode.deleteMany(
            {
                where : {
                    email : email
                }
            }
        )
    }

   async sendmailcode(email: string) {
        try {
            await this.deleteCode(email);
            const code =this.generateSixDigitCode();
            const user = await this.prisma.user.findUnique({
                where: {
                  email: email,
                },
                select: {
                    number: true,
                    email : true,
                }
              });
            this.sendmail(email, code )
            const expiryDate = new Date();
            
            expiryDate.setMinutes(expiryDate.getMinutes() + 2);
            const expiryDateString = expiryDate.toISOString();
            await this.prisma.verificationCode.create({
                data : {
                    email: email,
                    code : code,
                    expiryDate: expiryDateString
                }
            })
            return "code sent with success"
          } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error('Failed to send SMS');
          }
      }




    async sendsmscode(email: string) {
        try {
            await this.deleteCode(email);
            const code =this.generateSixDigitCode();
            const user = await this.prisma.user.findUnique({
                where: {
                  email: email,
                },
                select: {
                    number: true,
                    email : true,
                }
              });
            const number = "+216"+user.number.toString()
            await this.client.messages.create({
              body: "Your verification code  "+code,
              from: "+13604064109", 
              to : number
            });
            const expiryDate = new Date();
            
            expiryDate.setMinutes(expiryDate.getMinutes() + 2);
            const expiryDateString = expiryDate.toISOString();
            await this.prisma.verificationCode.create({
                data : {
                    email: email,
                    code : code,
                    expiryDate: expiryDateString
                }
            })
            return "code sent with success"
          } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error('Failed to send SMS');
          }
    
  }

  async signupLocal(dto : AuthDto) : Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
        data : {
            email: dto.email,
            hash, 
        },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateAtHash(newUser.id, tokens.access_token);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }




  async signinLocal(dto : AuthDto) : Promise<Tokens> {
    const  user = await this.prisma.user.findUnique(
        {
            where : {
                email : dto.email
            }
        }
    )
    
    if(!user) throw new ForbiddenException("Access Denied")
    const passwordMatches = await bcrypt.compare(dto.password, user.hash)
    if(!passwordMatches) throw new ForbiddenException("Access Denied")

        //2fa ***
    if(user.smsEnabled)
        {
            const tokens ={ access_token: "sms", refresh_token: "sms"}
            return tokens
        }
    if(user.emailEnabled)
        {
            const tokens ={ access_token: "mail", refresh_token: "mail"}
            return tokens

        }


    const tokens = await this.getTokens(user.id, user.email);
    await this.updateAtHash(user.id, tokens.access_token);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;

  }

  async logout(userId : string ){
    await this.prisma.user.updateMany({
        where : {
            id : userId,
            hashedRt : {
                not : null,
            },
        },
        data : {
            hashedRt : null,
            hashedAt : null
        }
    })
  }




  async updateRtHash(userId : string, rt : string )
  {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
        where : {
            id : userId,
        },
        data : {
            hashedRt : hash,
        },
    });
  }
  async updateAtHash(userId : string, at : string )
  {
    const hash = await this.hashData(at);
    await this.prisma.user.update({
        where : {
            id : userId,
        },
        data : {
            hashedAt : hash,
        },
    });
  }

  async refreshTokens(userId : string , rt : string){
    const user =  await this.prisma.user.findUnique({
        where : {
            id : userId
        }
    })
    if(!user) throw new ForbiddenException("Access Denied")
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if(!rtMatches) throw new ForbiddenException("Access Denied")

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
    

}



hashData(data : string) {
    return bcrypt.hash(data, 10);
  }


  async getTokens(userId : string, email : string){
    const [at , rt ] = await Promise.all([
        this.jwtService.signAsync({
            sub : userId,
            email,
        }, {
            secret : 'at-secret',
            expiresIn : 60 * 120,
        }),

        this.jwtService.signAsync({
            sub : userId,
            email,
        }, {
            secret : 'rt-secret',
            expiresIn : 60 * 60 * 24 * 7,
        })


    ])
    return {
        access_token : at,
        refresh_token : rt
    }

  }


  sendmail(email: string, code: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'noreply.pfe.2022@gmail.com',
      subject: 'Verification code',
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
        'this is your verification code: ' +
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
