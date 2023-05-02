import express, { urlencoded, json } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import createHttperror from 'http-errors';

import session from './session.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import apiRoutes from '../routes/api.js';
import passport from './passport.js';

const createServer = () => {
    const app = express();

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200,
    }

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(morgan('tiny'));
    app.use(urlencoded({extended: true}));
    app.use(helmet());
    app.disable('x-powered-by');
    
    app.use(session);
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', apiRoutes);
    // app.get('/*', (req, res) => {
    //     throw createHttperror(404, 'Page Not Found');
    // });

    app.use(errorHandler);
    return app;
};

export default createServer;
