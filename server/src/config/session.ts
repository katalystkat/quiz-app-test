import session from 'express-session';
import pgSession from 'connect-pg-simple';

const sessionStore = process.env.NODE_ENV === 'test' ? undefined : new (pgSession(session))({
    conObject: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: "postgres",
        password: "mysecretpassword",
        database: "bakery",
    },
    createTableIfMissing: true,
});

export default session({
    store: sessionStore,
    secret: 'renegadebio-nutriquiz',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        httpOnly: process.env.NODE_ENV == 'production' ? true : false,
        sameSite: 'lax',
        maxAge: 90 * 24 * 60 * 60 * 1000, // 3 months
    },
});