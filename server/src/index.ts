import dotenv from 'dotenv';
import 'reflect-metadata';
const dotenvResult = dotenv.config();
console.log('dotenvResult', dotenvResult);

import createServer from './config/server.js';
import { AppDataSource } from './data-source.js';
import { seedData } from './seeds/test-data.js';
// import { pool } from './data-source';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

const app = createServer();

AppDataSource.initialize()
    .then(async () => {
        // Create test user data
        await seedData();
        app.listen({ host, port }, () => {
            console.info(`⚡️ Server is running at http://${host}:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization: ", err)
    });