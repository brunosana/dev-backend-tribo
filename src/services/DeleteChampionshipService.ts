import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import ChampionshipTeams from '../models/ChampionshipTeams';

class DeleteChampionshipService {
    public async execute(id: string): Promise<void> {
        if (!id) {
            throw new AppError('Invalid id');
        }

        const championshipRepository = getRepository(Championship);

        const championship = await championshipRepository.findOne({
            where: { id },
        });

        if (!championship) {
            throw new AppError('Championship has not found');
        }

        const championshipTeamsRepository = getRepository(ChampionshipTeams);

        await championshipTeamsRepository.delete({
            championship: championship.id,
        });

        await championshipRepository.remove(championship);
    }
}

export default DeleteChampionshipService;
