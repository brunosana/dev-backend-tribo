import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getRepository } from 'typeorm';
import CreateChampionshipService from '../services/CreateChampionshipService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import GetChampionshipService from '../services/GetChampionshipService';
import UpdateChampionshipService from '../services/UpdateChampionshipService';
import DeleteChampionshipService from '../services/DeleteChampionshipService';
import Championship from '../models/Championship';

const championshipsRouter = Router();

championshipsRouter.post(
    '/',
    ensureAuthenticated,
    async (request, response) => {
        const { name, start, end, winnerId } = request.body;

        const convertedStartDate = parseISO(start);
        const convertedEndDate = parseISO(end);

        const createChampionshipService = new CreateChampionshipService();

        const championship = await createChampionshipService.execute({
            name,
            start: convertedStartDate,
            end: convertedEndDate,
            winnerId,
        });

        return response.json(championship);
    },
);

championshipsRouter.get('/', async (request, response) => {
    const championshipRepository = getRepository(Championship);

    const championships = await championshipRepository.find();

    return response.json(championships);
});

championshipsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const getChampionshipService = new GetChampionshipService();

    const championship = await getChampionshipService.execute(id);

    return response.json(championship);
});

championshipsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;

    const { name, start, end, winnerId } = request.body;

    const convertedStartDate = parseISO(start);
    const convertedEndDate = parseISO(end);

    const updateChampionshipService = new UpdateChampionshipService();

    const championship = await updateChampionshipService.execute({
        id,
        name,
        start: convertedStartDate,
        end: convertedEndDate,
        winnerId,
    });

    return response.json(championship);
});

championshipsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteChampionshipService = new DeleteChampionshipService();

    await deleteChampionshipService.execute(id);

    return response.status(204).send();
});

export default championshipsRouter;
