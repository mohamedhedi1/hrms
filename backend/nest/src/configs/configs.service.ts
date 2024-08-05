import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Config } from '@prisma/client';

@Injectable()
export class ConfigsService {
  constructor(private readonly prisma: PrismaService) {}

  async createConfig(createConfigDto: Config): Promise<Config> {
    const {
      companyName,
      companyLogo,
      address,
      cnssAffiliation,
      payDay,
      delayBeforePayment,
      cnssrate,
      cssrate,
    } = createConfigDto;
    return this.prisma.config.create({
      data: {
        companyName,
        companyLogo,
        address,
        cnssAffiliation,
        payDay,
        delayBeforePayment,
        cnssrate,
        cssrate,
      },
    });
  }

  async findAll(): Promise<Config[]> {
    return this.prisma.config.findMany();
  }

  async findOne(id: string): Promise<Config | string> {
    try {
      const record = await this.prisma.config.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          companyName: true,
          companyLogo: true,
          address: true,
          cnssAffiliation: true,
          payDay: true,
          delayBeforePayment: true,
          cnssrate: true,
          cssrate: true,
        },
      });

      if (!record) {
        return `Config with ID ${id} not found`;
      }

      return record;
    } catch (error) {
      console.error('Error fetching config:', error);
      throw new Error('Failed to fetch config');
    }
  }

  async update(
    id: string,
    updateConfigDto: Config,
  ): Promise<Config | any> {
    try {
      const updatedConfig = await this.prisma.config.update({
        where: { id: id },
        data: {
          companyName: updateConfigDto.companyName,
          companyLogo: updateConfigDto.companyLogo,
          address: updateConfigDto.address,
          cnssAffiliation: updateConfigDto.cnssAffiliation,
          payDay: updateConfigDto.payDay,
          delayBeforePayment: updateConfigDto.delayBeforePayment,
          cnssrate: updateConfigDto.cnssrate,
          cssrate: updateConfigDto.cssrate,
        },
        select: {
          id: true,
          companyName: true,
          companyLogo: true,
          address: true,
          cnssAffiliation: true,
          payDay: true,
          delayBeforePayment: true,
          cnssrate: true,
          cssrate: true,
        },
      });
      return updatedConfig;
    } catch (error) {
      console.error('Error updating config:', error);
      throw new Error('Failed to update config');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.config.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      console.error('Error deleting config:', error);
      throw new Error('Failed to delete config');
    }
  }
}
