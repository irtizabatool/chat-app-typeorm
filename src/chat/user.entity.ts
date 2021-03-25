import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, (sent) => sent.sender)
  sent: Message[];

  @OneToMany(() => Message, (received) => received.receiver)
  received: Message[];
}
