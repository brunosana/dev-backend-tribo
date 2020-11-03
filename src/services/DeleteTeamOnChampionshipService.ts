import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import ChampionshipTeams from '../models/ChampionshipTeams';

interface Request {
    championshipId: string;
    teamId: string;
}

class DeleteTeamOnChampionshipService {
    public async execute({ championshipId, teamId }: Request): Promise<void> {
        if (!championshipId) {
            throw new AppError('Championship id must be valid');
        }
        if (!teamId) {
            throw new AppError('Team id must be valid');
        }

        const championshipRepository = getRepository(Championship);

        const championship = await championshipRepository.findOne({
            where: { id: championshipId },
        });

        if (!championship) {
            throw new AppError('Championship has not found', 404);
        }

        const championshipTeamsRepository = getRepository(ChampionshipTeams);

        const teamRelation = await championshipTeamsRepository.findOne({
            where: { team: teamId, championship: championshipId },
        });

        if (!teamRelation) {
            throw new AppError(
                'This team not exist or is not in the championship',
            );
        }

        await championshipTeamsRepository.remove(teamRelation);
    }
}

export default DeleteTeamOnChampionshipService;
