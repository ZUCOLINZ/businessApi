import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './Branch';
import { Wallet } from './Wallet';

@Entity()
export class Business {
  constructor(data?: Business) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, type: 'varchar' })
  businessEmail?: string;

  @Column({ type: 'varchar' })
  businessPhone?: string;

  @Column({ type: 'varchar' })
  businessName?: string;

  @Column({ type: 'varchar' })
  city?: string;

  @OneToMany(() => Branch, (branch) => branch.business)
  branch?: Branch[];

  @OneToOne(() => Wallet, (wallet) => wallet.business)
  @JoinColumn()
  wallet?: Wallet;

  @Column({ type: 'varchar' })
  location?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
