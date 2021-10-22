import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { Employee } from './Employee/employee.entity';

import { Employee } from './employee.entity';
 
@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {}

    findAll(): Promise<Employee[]> {
      console.log("*********");
      
        return this.employeeRepo.find();
      }




      create(newEmploye){
        this.employeeRepo.insert(newEmploye)
       }

       update(employeetoUpdate){
        this.employeeRepo.update(employeetoUpdate.id,employeetoUpdate);
    }

    delete(id){
        this.employeeRepo.delete(id);
      }
}