import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Quiz } from './quiz';
  import { User } from './user';
  
  @Entity()
  export class QuizAttempt {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @CreateDateColumn({ nullable: false })
    createdAt!: Date;
  
    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;
  
    @ManyToOne(() => Quiz)
    @JoinColumn()
    quiz!: Quiz;
  
    @Column({ nullable: false })
    score!: number;
  }
  