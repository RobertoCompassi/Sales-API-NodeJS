import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json()); // padrao json na api
app.use(routes);
app.use(errors())

// middleware para tratamento global de erro 
app.use(
    (error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        } else {
            return response.status(500).json({
                status: 'error',
                message: 'Internal server error'
            })
        }
    }
);

app.listen(3000, () => {
    console.log('Server started on port 3000!');
});