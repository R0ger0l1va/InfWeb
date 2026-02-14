import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loveMessage')
export class LoveMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destinator: string;

  @Column()
  message: string;

  @Column()
  messageDate: Date;

  @Column({ default: 0 })
  likes: number;
}
