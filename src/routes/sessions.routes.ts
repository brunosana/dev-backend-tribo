import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

sessionsRouter.get('/', ensureAuthenticated, async (request, response) => {
    return response.json({ status: 'Success' });
});

export default sessionsRouter;
