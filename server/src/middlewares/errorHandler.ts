import { Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError, HttpError as IHttpError } from 'http-errors';

export const errorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let error: IHttpError;
    if (isHttpError(err)) {
        error = err;
    } else {
        // If not HttpError, throw internal server error
        console.error('Internal server Error', err.message);
        error = createHttpError(500, err.message ?? 'Unexpected Error');
    }
    
    const formattedError = {
        message: error.message,
        name: error.name,
        status: error.status,
    };

    res.status(error.statusCode).send(formattedError);
}