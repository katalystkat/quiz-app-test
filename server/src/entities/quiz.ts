// quiz.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Question } from './question';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  constructor(id: number, name: string, questions: Question[]) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
}
