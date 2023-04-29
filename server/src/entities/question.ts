import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz';
import { Option } from './option';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz!: Quiz;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options!: Option[];
}
