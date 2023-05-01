import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {Question} from './question.js';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @Column({ name: 'is_correct' })
  isCorrect!: boolean;

  @Column({ name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => Question)
  question!: Question;

  @Column({ name: 'option_index' })
  optionIndex!: number;

  @Column({ name: 'quiz_id'})
  quizId!: string;
}
