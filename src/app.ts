import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import AppError from './errors/AppError';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError){
            return response.status(err.statusCode).json({
                status: 'Error',
                message: err.message
            });
        }
        console.log(err.message);
        return response.status(500).json({
            status: 'Error',
            message: 'Internal server error'
        });
    }
)

export default app;
