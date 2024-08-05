import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class PasswordresetService {

    constructor(private prisma: PrismaService,
        private mailerService : MailerService,
        ){}

        async resetPassword(token: string, newPassword: string) {
            const resetToken = await this.prisma.passwordResetToken.findFirst({
                where: {
                  token: token
                },
              });
              if (!resetToken) {
                throw new NotFoundException('Reset token not found');
              }
          
              if ( new Date(resetToken.expiryDate) < new Date()) {
                throw new BadRequestException('Reset token has expired');
              }

              const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashing the new password
              await this.prisma.user.update({
                where: {
                  email: resetToken.email,
                },
                data: {
                  hash: hashedPassword,
                },
              });

              await this.prisma.passwordResetToken.deleteMany({
                where: {
                  token: token,
                },
              });

        }


    async requestPasswordReset(email: string) {
         try {
           
        const user = await this.prisma.user
        .findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            return 'User not found';
           
          }
          
        const token = this.generateUUID();
        await this.createPasswordResetTokenForUser(email, token);
        await this.sendPasswordResetEmail(email, token);
  
        return 'Password reset email sent successfully';
      } catch (error) {
        
      }
       
    }

   

   async  createPasswordResetTokenForUser(email: string, token: string): Promise<void> {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 5);
        const expiryDateString = expiryDate.toISOString();
        await this.prisma.passwordResetToken.create({
            data: {
                email:email,
                token : token,
                expiryDate : expiryDateString
            }
            
        })
    }

    generateUUID(): string {
        return uuidv4();
      }


      async sendPasswordResetEmail(email: string, token: string): Promise<void> {
        this.mailerService.sendMail({
            to : email , 
            from : 'noreply.pfe.2022@gmail.com' ,
            subject : 'Password Reset',
            html :  "<html>"+ "\n" +
            "<body marginheight=\"0\" topmargin=\"0\" marginwidth=\"0\" style=\"margin: 0px; background-color: #f2f3f8;\" leftmargin=\"0\">\n" +
            "    <!--100% body table-->\n" +
            "    <table cellspacing=\"0\" border=\"0\" cellpadding=\"0\" width=\"100%\" bgcolor=\"#f2f3f8\"\n" +
            "        style=\"@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;\">\n" +
            "        <tr>\n" +
            "            <td>\n" +
            "                <table style=\"background-color: #f2f3f8; max-width:670px;  margin:0 auto;\" width=\"100%\" border=\"0\"\n" +
            "                    align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                    <tr>\n" +
            "                        <td style=\"height:80px;\">&nbsp;</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td style=\"text-align:center;\">\n" +
            "                          <a href=\"http://localhost:4200/newpassword?token="+token+"\" title=\"logo\" target=\"_blank\">\n" +
            "                            <img width=\"60\" src=\"https://i.ibb.co/hL4XZp2/android-chrome-192x192.png\" title=\"logo\" alt=\"logo\">\n" +
            "                          </a>\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td style=\"height:20px;\">&nbsp;</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>\n" +
            "                            <table width=\"95%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"\n" +
            "                                style=\"max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);\">\n" +
            "                                <tr>\n" +
            "                                    <td style=\"height:40px;\">&nbsp;</td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td style=\"padding:0 35px;\">\n" +
            "                                        <h1 style=\"color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;\">You have\n" +
            "                                            requested to reset your password</h1>\n" +
            "                                        <span\n" +
            "                                            style=\"display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;\"></span>\n" +
            "                                        <p style=\"color:#455056; font-size:15px;line-height:24px; margin:0;\">\n" +
            " Hello,\n" +
            "\n" +
            " \n" +
            "\n" +
            "We have sent you this email in response to your request to reset your password on HRMS.\n" +
            "\n" +
            " \n" +
            "\n" +
            "To reset your password, click the following link and follow the instructions:\n" +
            "                                        </p>\n" +
            "                                        <a href=\"talentnest.mywire.org/newpassword?token="+token+"\"\n" +
            "                                            style=\"background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;\">Reset\n" +
            "                                            Password</a>\n" +
            "                                    </td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td style=\"height:40px;\">&nbsp;</td>\n" +
            "                                </tr>\n" +
            "                            </table>\n" +
            "                        </td>\n" +
            "                    <tr>\n" +
            "                        <td style=\"height:20px;\">&nbsp;</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td style=\"text-align:center;\">\n" +
            "                            <p style=\"font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;\">&copy; <strong>HRMS</strong></p>\n" +
            "                        </td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td style=\"height:80px;\">&nbsp;</td>\n" +
            "                    </tr>\n" +
            "                </table>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "    </table>\n" +
            "    <!--/100% body table-->\n" +
            "</body>\n" +
            "\n" +
            "</html>"
          })
    }
     
       
      
}
