import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequest } from './dtos/RegisterRequest.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Observable } from 'rxjs';
import { Userprofile } from './dtos/Userprofile';

@Injectable()
export class UsersService {
 
 
 
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async setSettings(email: string, body: any) {
    return  await  this.prisma.user.update({
      where : {
        email : email
      },
      data: {
        emailEnabled: body.emailEnabled,
        smsEnabled : body.smsEnabled
      }
    })
  }

  async getSettings(email: string) {
    return await this.prisma.user.findUnique({
      where : {
        email : email
      },
      select : {
        emailEnabled: true,
        smsEnabled : true
      }
    })
  }

  async uploadImage(email: string, image: string) {
    return await this.prisma.user.update({
      where : {email: email},
      data : {
        image: image
      }
    })
  }

  async updateUser(userId: string, updateUserDto: any) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstname: updateUserDto.firstname,
        lastname: updateUserDto.lastname,
        job: updateUserDto.job,
        email: updateUserDto.email,
        number: updateUserDto.number,
        address: updateUserDto.address,
        birthday: updateUserDto.birthday,
        degree: updateUserDto.degree,
        roleId: updateUserDto.roleId,
      },
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<Userprofile> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        address: true,
        birthday: true,
        degree: true,
        number: true,
        job: true,
        image: true,
      },
    });
  }

  deteteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async addUser(registerRequest: RegisterRequest) {
    const password = this.generatePassword();
    const hash = await this.hashData(password);
    this.sendMail(registerRequest.email, password);
    const newUser = await this.prisma.user.create({
      data: {
        firstname: registerRequest.firstname,
        lastname: registerRequest.lastname,
        email: registerRequest.email,
        address: registerRequest.address,
        birthday: registerRequest.birthday,
        degree: registerRequest.degree,
        number: registerRequest.number,
        basicSalary : registerRequest.basicSalary,
        offDays : registerRequest.offDays,
        familySituation : registerRequest.familySituation,
        childrenNumber  : registerRequest.childrenNumber,
        bankrib  : registerRequest.bankrib,
        numCnss  : registerRequest.numCnss,
        cin  : registerRequest.cin,
        job: registerRequest.job,
        hash: hash,
        smsEnabled : false,
        emailEnabled : false,
        roles: {
          connect: registerRequest.roles.map((role) => ({ id: role.id })),
        },
      },
    });

    return newUser;
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserAndPrivileges(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: {
          include: {
            privileges: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const privileges = user.roles.reduce((acc, role) => {
      acc.push(...role.privileges);
      return acc;
    }, []);

    const names: string[] = [];
    for (const item of privileges) {
      if (item.name) {
        names.push(item.name);
      }
    }
    return {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      authorities: names,
    };
  }

  getUserPrivilegesByEmail(email: string) {
    return this.prisma.user
      .findUnique({
        where: {
          email: email,
        },
        include: {
          roles: {
            include: {
              privileges: true,
            },
          },
        },
      })
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }

        const privileges = user.roles.reduce((acc, role) => {
          acc.push(...role.privileges);
          return acc;
        }, []);

        return privileges;
      });
  }

  async assignRoleToUser(userId: string, roleId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          roles: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }
      const hasRole = user.roles.some((role) => role.id === roleId);
      if (hasRole) {
        throw new Error('User already has this role');
      }
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          roles: {
            connect: {
              id: roleId,
            },
          },
        },
      });

      return { success: true, message: 'Role assigned to user successfully' };
    } catch (error) {
      console.error('Error assigning role to user:', error);
      throw error;
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  generatePassword(): string {
    const characterSet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const passwordSize = 8;
    let password = '';
    const charSetLength = characterSet.length;
    for (let i = 0; i < passwordSize; i++) {
      const randomIndex = Math.floor(Math.random() * charSetLength);
      password += characterSet[randomIndex];
    }
    return password;
  }

  sendMail(email: string, password: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'noreply.pfe.2022@gmail.com',
      subject: 'HRMS PASSWORD',
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
        'this is your password : ' +
        password +
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
