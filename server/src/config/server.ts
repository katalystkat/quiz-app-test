import express, { urlencoded, json } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import createHttperror from 'http-errors';

import session from './session';
import { errorHandler } from '../middlewares/errorHandler';
import apiRoutes from '../routes/api';
import passport from './passport';

const createServer = () => {
    const app = express();

    const corsOptions = {
        origin: process.env.CORS_ORIGIN_ALLOWED,
        credentials: true,
        optionsSuccessStatus: 200,
    }

    app.use(express.json());
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(urlencoded({extended: true}));
    app.use(helmet());
    app.disable('x-powered-by');
    
    app.use(session);
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(`/${process.env.API_ROUTES_PREFIX}`, apiRoutes);
    app.get('/*', (req, res) => {
        throw createHttperror(404, 'Page Not Found');
    });

    app.use(errorHandler);
    return app;
};

export default createServer;
