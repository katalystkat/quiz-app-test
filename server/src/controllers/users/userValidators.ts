import createHttpError from 'http-errors';

import { UsersCreateBody } from '../../types/routes/users';

export const validateCreateBody = (body: Partial<UsersCreateBody>) => {
    const { username, email, password } = body;

    if (!username){
        throw createHttpError(400, 'Username required');
    }
    if (!email){
        throw createHttpError(400, 'Email required');
    }
    if (!password){
        throw createHttpError(400, 'Password required');
    }
    if (password.length < 8){
        throw createHttpError(400, 'Password must contain at least 8 characters');
    }
    return body as UsersCreateBody;
}