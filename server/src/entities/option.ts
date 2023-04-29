import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question';

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

  @ManyToOne(() => Question, (question) => question.options, { onDelete: 'CASCADE' })
  question!: Question;

  @Column({ name: 'option_index' })
  optionIndex!: number;
}
