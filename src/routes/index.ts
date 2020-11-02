import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import teamsRouter from './teams.routes';
import championshipsRoutes from './championships.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/teams', teamsRouter);
routes.use('/championships', championshipsRoutes);

export default routes;
