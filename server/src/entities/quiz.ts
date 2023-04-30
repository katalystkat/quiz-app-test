// quiz.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Question } from './question.js';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  constructor(id: number, name: string, questions: Question[]) {
    this.id = id;
    this.name = name;
  }
}
