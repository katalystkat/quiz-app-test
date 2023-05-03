import { NextFunction, Response } from 'express';
import createHttpError, { HttpError }from 'http-errors';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source.js';
import { Participant } from '../../entities/participant.js';
import { TypedRequestBody } from '../../types/express/express.js';
import { UsersCreateBody } from '../../types/routes/users.js';
import { validateCreateBody } from './userValidators.js';
import { validateLoginBody } from '../auth/authValidators.js';

const create = async (req: TypedRequestBody<UsersCreateBody>, res: Response) => {
    const { username, email, password } = validateCreateBody(req.body);

    // Create a query runner to control the transactions, it allows to cancel the transaction if we need to
    const queryRunner = AppDataSource.createQueryRunner();

    // Connect the query runner to the database and start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const userRepo = queryRunner.manager.getRepository(Participant);
        const usernameExists = await userRepo.exist({
            where: { username }
        });
        if (usernameExists) {
            throw createHttpError(409, 'Username already exists');
        }

        const emailExists = await userRepo.exist({
            where: { email }
        });
        if (emailExists) {
            throw createHttpError(409, 'Email already exists');
        }

        const newUser = new Participant();
        newUser.username = username;
        newUser.email = email;
        newUser.setPassword(password);
        await queryRunner.manager.save(newUser);

        // No exceptions occured, so we commit the transaction
        await queryRunner.commitTransaction();

        res.status(201).send(newUser.id);
    } catch (err) {
        // As an exception occured, cancel the transaction
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        // We need to release the query runner to not keep a useless connection to the database
        await queryRunner.release();
    }
};


// Future Controllers for OTP
// // GET: http://localhost:8080/users/generateOTP
// const generateOTP = async (req: TypedRequestBody<UsersCreateBody>, res: Response)=> {
//     res.json('generateOTP route');
// }

// // GET: http://localhost:8080/users/verifyOTP
// const verifyOTP = async (req: TypedRequestBody<UsersCreateBody>, res: Response)=> {
//     res.json('verifyOTP route');
// }

// // GET: http://localhost:8080/users/createResetSession
// // Redirects User when OTP is valid
// const createResetSession = async (req: TypedRequestBody<UsersCreateBody>, res: Response)=> {
//     res.json('createResetSession route');
// }

export default {
    create,
};