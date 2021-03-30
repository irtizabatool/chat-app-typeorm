import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.sent)
  sender: User;

  @ManyToOne(() => User, (user) => user.received)
  receiver: User;

  @Column()
  message: string;

  @CreateDateColumn()
  date: string;
}
