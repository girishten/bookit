import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../models/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('text')
  namePrefix: string;

  @Column('text')
  firstName: string;

  @Column('text')
  middleName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column('text')
  password: string;

  @Column('text')
  role: UserRole[];

  @Column('date')
  createdAt: Date;

  @Column('text')
  createdBy: string;

  @Column('date')
  updatedAt: Date;

  @Column('text')
  updatedBy: string;
}
