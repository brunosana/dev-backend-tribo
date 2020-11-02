import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import Team from '../models/Team';

class GetChampionshipService {
    public async execute(id: string): Promise<Championship> {
        if (!id) {
            throw new AppError('Invalid id');
        }
        const championshipRepository = getRepository(Championship);

        const championship = await championshipRepository.findOne({
            where: { id },
        });
        if (!championship) {
            throw new AppError('Championhsip has not found', 404);
        }
        if (championship.winnerId) {
            const teamRepository = getRepository(Team);
            const winner = await teamRepository.findOne({
                where: { id: championship.winnerId },
            });
            if (winner) {
                championship.winner = winner;
            }
        }
        return championship;
    }
}

export default GetChampionshipService;
