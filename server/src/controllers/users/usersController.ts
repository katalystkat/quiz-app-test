import { Response } from 'express';
import createHttpError from 'http-errors';

import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user';
import { TypedRequestBody } from '../../types/express/express';
import { UsersCreateBody } from '../../types/routes/users';
import { validateCreateBody } from './userValidators';

// Validate, Control, Connect, Start Transaction
const create = async (req: TypedRequestBody<UsersCreateBody>, res: Response)=> {
    const { username, email, password } = validateCreateBody(req.body);
    const queryRunner = AppDataSource.createQueryRunner();

    // Connnect to db and start transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        const userRepo = queryRunner.manager.getRepository(User);
        const usernameExists = await userRepo.exist({
            where : { username }
        });
        if (usernameExists){
            throw createHttpError(409, 'Username already exists');
        }
        const emailExists = await userRepo.exist({
            where: { email }
        });
        if (emailExists) {
            throw createHttpError(409, 'Email already exists');
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.setPassword(password);
        await queryRunner.manager.save(newUser);
        // no exceptions occurred, commit the transaction
        await queryRunner.commitTransaction();
        res.send(newUser.id);
    } catch (error){
        // if an exception happens
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
};

export default {
    create,
};