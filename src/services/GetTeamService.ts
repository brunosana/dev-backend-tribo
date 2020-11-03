import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import ChampionshipTeams from '../models/ChampionshipTeams';
import Team from '../models/Team';

interface championshipIds {
    id: string;
}

class GetTeamService {
    public async execute(id: string): Promise<Team> {
        if (!id) {
            throw new AppError('Invalid id');
        }

        const teamRepository = getRepository(Team);

        const team = await teamRepository.findOne({
            where: { id },
        });

        if (!team) {
            throw new AppError('Team has not be found', 404);
        }

        const championshipTeamsRepository = getRepository(ChampionshipTeams);

        const championshipRelations = await championshipTeamsRepository.find({
            where: { team: id },
        });

        if (championshipRelations.length > 0) {
            const championshipsIDs: championshipIds[] = [];

            championshipRelations.forEach(relation => {
                championshipsIDs.push({ id: relation.championship });
            });

            const championshipRepository = getRepository(Championship);

            const championships = await championshipRepository.find({
                where: championshipsIDs,
            });

            team.championships = championships;
        }

        return team;
    }
}

export default GetTeamService;
