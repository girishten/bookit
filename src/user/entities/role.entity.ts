import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryColumn('text')
  name: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('text')
  createdBy: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('text')
  updatedBy: string;

  equals(userRole: UserRole) {
    return this.name === userRole.name;
  }
}
