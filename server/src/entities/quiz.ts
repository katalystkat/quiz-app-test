// quiz.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Question } from './question.js';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  constructor(id: string, name: string, questions: Question[]) {
    this.id = id;
    this.name = name;
  }
}
