import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './Business';
import { RevenueGoal } from './RevenueGoal';

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

  @OneToOne(() => RevenueGoal, (revenueGoal) => revenueGoal.branch)
  revenueGoal?: RevenueGoal;

  @ManyToOne(() => Business, (business) => business.branch)
  business?: Business;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
