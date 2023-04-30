import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import createServer from './config/server';
import { AppDataSource } from './data-source';
// import { pool } from './data-source';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

const app = createServer();

// app.get('/home', async(req, res) => {
//     try{
//         const quizzes = await pool.query('SELECT * FROM quizdb')
//         res.json(quizzes)
//     } catch (err){
//         console.log(err);
//     }
// })

// app.listen(port, () => {
//     console.log(`Server is running on PORT ${port}`)
// })

AppDataSource.initialize()
    .then(() => {
        app.listen({ host, port }, () => {
            console.info(`⚡️ Server is running at http://${host}:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization: ", err)
    })