import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export const isAuthenticated = (req: Request, res:Response, next:NextFunction) => {
    if (req.isAuthenticated()){
        console.log('in authenticate function');
        next();
    } else {
        next(createHttpError(403, 'User not authenticated'));
    }
}

export const isUnauthenticated = (req: Request, res:Response, next:NextFunction) => {
    if (req.isUnauthenticated()){
        next();
    } else {
        next(createHttpError(403, 'User must not be authenticated'));
    }
}