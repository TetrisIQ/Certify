import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import express, {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import logger from './shared/Logger';
import morgan from "morgan";
import ReportController from "./controller/ReportController";
const bodyParser = require('body-parser');

// Init express
const app = express();

// Use body parser
//app.use(bodyParser);


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api/reports', ReportController);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

// Export express instance
export default app;
