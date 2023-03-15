import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './Business';

@Entity()
export class Branch {
  constructor(data?: Branch) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  branchName?: string;

  @Column({ type: 'varchar' })
  postalCode?: string;

  @Column({ type: 'varchar' })
  address?: string;

  @ManyToOne(() => Business, (business) => business.branch)
  business?: Business;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
