import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './role.entity';

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

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles: UserRole[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('text')
  createdBy: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('text')
  updatedBy: string;

  equals(user: User) {
    return this.id === user.id;
  }
}
