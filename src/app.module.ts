import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './Employee/employee.entity';
import { EmployeeModule } from './Employee/employee.module';
@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'nu10',
    database: 'nu10_wallet_stellar',
    entities: [Employee],
  }) ],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
