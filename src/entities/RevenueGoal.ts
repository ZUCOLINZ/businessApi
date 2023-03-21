import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Branch } from './Branch';
import { Business } from './Business';

@Entity()
export class RevenueGoal {
  constructor(data?: RevenueGoal) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goal: number;

  @Column({ type: 'enum', enum: ['NGN', 'DOLLAR'] })
  currency: 'NGN' | 'DOLLAR';

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Branch, (branch) => branch.revenueGoal)
  branch?: Branch;

  @ManyToOne(() => Business, (business) => business.revenueGoal)
  business: Business;
}
