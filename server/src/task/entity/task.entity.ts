import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isStared: boolean;

  @Column({ default: 'Awaits execution' })
  status: string

  @CreateDateColumn()
  createdAt: Date;
}