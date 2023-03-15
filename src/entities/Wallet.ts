import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './Business';

@Entity()
export class Wallet {
  constructor(data?: Wallet) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, type: 'varchar' })
  accountName?: string;

  @Column({ type: 'varchar' })
  accountNumber?: number;

  @Column({ type: 'int', default: 0 })
  balance?: number;

  @Column({ type: 'int', default: 0 })
  amount?: number;

  @OneToOne(() => Business, (business) => business.wallet)
  business?: Business;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
