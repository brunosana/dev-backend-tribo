import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import ChampionshipTeams from '../models/ChampionshipTeams';
import Team from '../models/Team';

interface Request {
    championshipId: string;
    teamId: string;
}

class AddTeamOnChampionshipService {
    public async execute({ championshipId, teamId }: Request): Promise<Team> {
        if (!championshipId) {
            throw new AppError('Invalid Championship Id');
        }
        if (!teamId) {
            throw new AppError('Invalid Team Id');
        }

        const championshipRepository = getRepository(Championship);

        const checkIfChampionshipExists = await championshipRepository.findOne({
            where: { id: championshipId },
        });

        if (!checkIfChampionshipExists) {
            throw new AppError('Championship not found', 404);
        }

        const teamRepository = getRepository(Team);

        const checkIfTeamExists = await teamRepository.findOne({
            where: { id: teamId },
        });

        if (!checkIfTeamExists) {
            throw new AppError('Team not found', 404);
        }

        const championshipTeamsRepository = getRepository(ChampionshipTeams);

        const newChampionshipTeam = championshipTeamsRepository.create({
            championship: championshipId,
            team: teamId,
        });

        const checkIfTeamAlreadyAddedOnChampionship = await championshipTeamsRepository.findOne(
            {
                where: { championship: championshipId, team: teamId },
            },
        );

        if (checkIfTeamAlreadyAddedOnChampionship) {
            throw new AppError('This team already exists on this championship');
        }

        await championshipTeamsRepository.save(newChampionshipTeam);

        const team = checkIfTeamExists;

        return team;
    }
}

export default AddTeamOnChampionshipService;
