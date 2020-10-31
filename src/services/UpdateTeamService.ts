import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Team from '../models/Team';

interface Request {
    id: string;
    name: string;
    logo?: string;
    player1?: string;
    player2?: string;
    player3?: string;
    player4?: string;
    player5?: string;
    coach?: string;
}

class UpdateTeamService {
    public async execute({
        id,
        name,
        logo = '',
        player1 = '',
        player2 = '',
        player3 = '',
        player4 = '',
        player5 = '',
        coach = '',
    }: Request): Promise<Team> {
        if (!id) {
            throw new AppError('Invalid id');
        }
        if (!name) {
            throw new AppError('Invalid team name');
        }

        const teamRepository = getRepository(Team);

        const team = await teamRepository.findOne({
            where: { id },
        });

        if (!team) {
            throw new AppError('Team has not be found', 404);
        }

        team.name = name;
        team.logo = logo;
        team.player1 = player1;
        team.player2 = player2;
        team.player3 = player3;
        team.player4 = player4;
        team.player5 = player5;
        team.coach = coach;

        await teamRepository.save(team);

        return team;
    }
}

export default UpdateTeamService;
