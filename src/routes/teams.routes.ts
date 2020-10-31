import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateTeamService from '../services/CreateTeamService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateTeamService from '../services/UpdateTeamService';
import DeleteTeamService from '../services/DeleteTeamService';
import Team from '../models/Team';
import GetTeamService from '../services/GetTeamService';

const teamsRouter = Router();

teamsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const {
        name,
        logo,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach,
    } = request.body;

    const createTeamService = new CreateTeamService();

    const team = await createTeamService.execute({
        name: name.toUpperCase(),
        logo,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach,
    });

    return response.json(team);
});

teamsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
    const {
        name,
        logo,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach,
    } = request.body;

    const { id } = request.params;

    const updateTeamService = new UpdateTeamService();

    const team = await updateTeamService.execute({
        id,
        name: name.toUpperCase(),
        logo,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach,
    });

    return response.json(team);
});

teamsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const deleteTeamService = new DeleteTeamService();

    await deleteTeamService.execute(id);

    return response.status(204).send();
});

teamsRouter.get('/', async (request, response) => {
    const teamRepository = getRepository(Team);

    const teams = await teamRepository.find();

    return response.json(teams);
});

teamsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const getTeamService = new GetTeamService();

    const team = await getTeamService.execute(id);

    return response.json(team);
});

export default teamsRouter;
