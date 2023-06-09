import createHttpError from 'http-errors';

import { AuthLoginBody } from '../../types/routes/auth.js';

// handle login request body validation
export const validateLoginBody = (body: Partial<AuthLoginBody>) => {
    const { username, password } = body;
    if (!username){
        throw createHttpError(400, 'Username or email address required');
    }

    if (!password){
        throw createHttpError(400, 'Password required');
    }
    return body as AuthLoginBody;
}