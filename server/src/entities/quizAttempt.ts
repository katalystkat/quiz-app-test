import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Quiz } from './quiz.js';
  import { Participant } from './participant.js';
  
  @Entity()
  export class QuizAttempt {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @CreateDateColumn({ nullable: false })
    createdAt!: Date;
  
    @ManyToOne(() => Participant)
    @JoinColumn()
    user!: Participant;
  
    @ManyToOne(() => Quiz)
    @JoinColumn()
    quiz!: Quiz;
  
    @Column({ nullable: false })
    score!: number;
  }
  