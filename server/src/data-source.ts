import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    port: process.env.NODE_ENV === 'test' ? Number(process.env.TEST_DB_PORT) : Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    synchronize: true,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"]
})
