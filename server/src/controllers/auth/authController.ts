import {NextFunction, Request, Response} from 'express';
import createHttpError, { HttpError } from 'http-errors';
import passport from 'passport';

import { Participant } from '../../entities/participant.js';
import { TypedRequestBody } from '../../types/express/express.js';
import { AuthLoginBody, AuthLoginResponse } from '../../types/routes/auth.js';
import { validateLoginBody } from './authValidators.js';
// TODO: Debug req.session destroy; Can not id session for requests

// Handles user authentication login, logout, authentication
const login = (
    req: TypedRequestBody<AuthLoginBody>,
    res: Response<AuthLoginResponse>,
    next: NextFunction,
) => {
    validateLoginBody(req.body);
    passport.authenticate(
        'local',
        (err: HttpError | null, user: Participant | undefined) => {
            if (err){
                return next(err);
            }
            if (!user) {
                return next(
                    createHttpError(401, 'User not found in database'),
                );
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                })
            })
        }
    )(req, res, next);
}

const logout = (
    req: TypedRequestBody<AuthLoginBody>,
    res: Response<AuthLoginResponse>,
    next: NextFunction,
) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        // Clear the session cookie from the user's browser
        res.clearCookie('the golden kiwi'); // Replace with your session cookie name
        return res.send();
      });

    });
  };

const authenticated = (
    req: Request,
    res: Response,
) => {
    if (req.isAuthenticated()){
        res.send('User Authenticated');
    } else {
        res.send('User not authenticated');
    }
};

export default{
    login, 
    logout, 
    authenticated,
}