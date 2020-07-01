import Express from 'express';
import bodyParser from 'body-parser';
import userRouter from './api/user/index';
import morgan from 'morgan';
import { IServerConfigurations } from "./config";
import logger from './middleware/logger';

export async function init(config: IServerConfigurations){

    const app: Express.Application = Express();
    
    // logger
    app.use(morgan('combined', { stream: { write: message => logger.info(message) }}));
    
    // Body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    
    // primary routes
    app.use('/user', userRouter);
    
    return app;
}