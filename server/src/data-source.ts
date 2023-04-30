import { DataSource } from 'typeorm';
import { Participant } from './entities/participant.js';
import { Quiz } from './entities/quiz.js';
import { Question } from './entities/question.js'
import { Option } from './entities/option.js';
import { QuizAttempt } from './entities/quizAttempt.js';
import dotenv from 'dotenv';
// import { Pool } from 'pg';
// import { join } from "path";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'bakery',
    synchronize: true,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"]
})

// export const pool = new Pool({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "mysecretpassword",
//     database: "quizdb",
// })

// try {
//     await AppDataSource.initialize();
//     console.log('AppDataSource connection established successfully');
// } catch (error){
//     console.log('Error connecting to AppDataSource', error);
// }

// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST,
//     port: process.env.NODE_ENV === 'test' ? Number(process.env.TEST_DB_PORT) : Number(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
//     logging: false,
//     synchronize: process.env.NODE_ENV ==='test',
//     entities: process.env.NODE_ENV === "production" ? ["build/entities/**/*.js"] : [join(__dirname, "./entities/**/*.ts")],
//     subscribers: process.env.NODE_ENV === "production" ? ["build/subscribers/**/*.js"] : [join(__dirname, "./subscribers/**/*.ts")],
//     migrations: process.env.NODE_ENV === "production" ? ["build/migrations/**/*.js"] : [join(__dirname, "./migrations/**/*.ts")],
// });