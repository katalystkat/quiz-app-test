import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { AppDataSource } from '../data-source.js';
import { Participant } from '../entities/participant.js';

// Using Local authentication to check if user exists in db and if password matches user's stored password

passport.use(
    new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
        },
        async (login, password, done) => {
            try {
                const userRepo = AppDataSource.getRepository(Participant);
                
                // Search a user whose username is the login parameter
                const user = await userRepo.findOne({
                    where: [{ username: login }, { email: login}],
                });

                // If the user doesn't exist or the password is wrong, return error as null and user as null
                // It allows to distinguish technical error and wrong credentials
                if (!user || !user.verifyPassword(password)) {
                    return done(null, undefined);
                }
                // If credentials are valid, calls done with authenticated user object
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (req: Request, id: string, done: any) => {
    const userRepo = AppDataSource.getRepository(Participant);
    const user = await userRepo.findOneBy({ id });

    if (!user) {
        // if passport tries to deserialize user but id doesn't exist anymore in db,
        // it means the user has been deleted, so logout the request
        req.logout(() => undefined);
        done(null, null);
    } else {
        done(null, user);
    }
});

export default passport;