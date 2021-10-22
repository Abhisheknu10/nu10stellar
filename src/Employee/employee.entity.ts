import { Entity,PrimaryColumn,PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity()
export class Employee {
  
  @PrimaryColumn()
  id: number;
 
  @Column()
  name: string;
 
  @Column()
  publickey: string;
  @Column()
  secret: string;
}