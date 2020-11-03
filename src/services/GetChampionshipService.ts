import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import ChampionshipTeams from '../models/ChampionshipTeams';
import Team from '../models/Team';

interface teamsIdProps {
    id: string;
}

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

        const championshipTeamRepository = getRepository(ChampionshipTeams);

        const relations = await championshipTeamRepository.find({
            where: {
                championship: championship.id,
            },
        });

        if (relations.length > 0) {
            const teamsID: teamsIdProps[] = [];

            relations.forEach(relation => {
                teamsID.push({
                    id: relation.team,
                });
            });

            const teamRepository = getRepository(Team);

            const teams = await teamRepository.find({
                where: teamsID,
            });

            if (teams) {
                championship.teams = teams;
            }
        }

        return championship;
    }
}

export default GetChampionshipService;
