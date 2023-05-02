import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
// import ENV from '../config.js'
export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Access authorization header to validate request 
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw createHttpError(401, 'AuthenticationFailed');
        }
        const token = authHeader.split(" ")[1];

        const decodedToken = await jwt.verify(token, 'secret');
        req.user = decodedToken;
        res.json(decodedToken);
        // next();
    } catch (error) {
        next(createHttpError(401, 'AuthenticationFailed'));
    }
}


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        console.log('checking authentication')
        next();
    } else {
        console.log('is not authenticated');
        next(createHttpError(403, 'User must be authenticated'));
    }
}

export const isUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isUnauthenticated()) {
        next()
    } else {
        next(createHttpError(403, 'User must not be authenticated'));
    }
}