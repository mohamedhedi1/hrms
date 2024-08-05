import { Injectable } from '@nestjs/common';
import { CreateDepartmentManagementDto } from './dto/create-department-management.dto';
import { UpdateDepartmentManagementDto } from './dto/update-department-management.dto';
import { PrismaService } from 'src/prisma.service';
import {Department, Prisma,  } from '@prisma/client';


@Injectable()
export class DepartmentManagementService {
  constructor(private readonly prisma: PrismaService) {
    let includePosts: boolean = false
    let department: Prisma.DepartmentCreateInput

  }
 
 
  async createDepartment(createDepartmentDto: CreateDepartmentManagementDto): Promise<Department> {
    const {name,Detail_department} = createDepartmentDto;

    return this.prisma.department.create({
      data: {
        name,
        Detail_department
      }
    });
  }


  async findAll():Promise<Department[]> {
    return this.prisma.department.findMany()}
 
 
 
    async findOne(id: string): Promise<Department | string> {
      try {
        const record = await this.prisma.department.findUnique({
          where: {
            id: id
          },
          select: {
            id:true,
            name:true,
            Detail_department:true
            
          }
        });
    
        if (!record) {
          return "this id : " +id+ " Not found";
        }
    
        return record;
      } catch (error) {
        console.error("Error fetching department:", error);
        throw new Error("Failed to fetch department");
      }
    }
    
    

    async update(id: string, updateDepartmentManagementDto: Department): Promise<Department > {
      try {
        const updateDepartment = await this.prisma.department.update({
          where: { id: id }, // Specify which attendance record to update based on the id
          data: {
            name:updateDepartmentManagementDto.name,
            Detail_department:updateDepartmentManagementDto.Detail_department
           
            
          },
          select: {
            id: true,
            name:true,
            Detail_department:true
          }
        });
        return updateDepartment;
      } catch (error) {
        console.error("Error updating department:", error);
        throw new Error("Failed to update department");
      }
    }


    async remove(id: string): Promise<boolean> {
      try {
        const deletedRecord = await this.prisma.department.delete({
          where: {
            id: id
          }
        });
  
    
        // If a record is returned, deletion was successful
        return true;
      } catch (error) {
        console.error("Error deleting department:", error);
        throw new Error("Failed to delete department");
      }
    }
  }
  