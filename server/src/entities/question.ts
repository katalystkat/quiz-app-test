import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.js';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @Column({ name: 'quiz_id' })
  quizId!: string;

  @Column({ name: 'questionId'})
  questionId!: string;
}
