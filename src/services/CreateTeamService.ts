import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Team from '../models/Team';

interface Request {
    name: string;
    logo?: string;
    player1?: string;
    player2?: string;
    player3?: string;
    player4?: string;
    player5?: string;
    coach?: string;
}

class CreateTeamService {
    public async execute({
        name,
        logo = '',
        player1 = '',
        player2 = '',
        player3 = '',
        player4 = '',
        player5 = '',
        coach = '',
    }: Request): Promise<Team> {
        if (!name) {
            throw new AppError('Invalid team name');
        }

        const teamRepository = getRepository(Team);

        const checkIfTeamExsits = await teamRepository.findOne({
            where: { name },
        });

        if (checkIfTeamExsits) {
            throw new AppError('Team already exists');
        }

        const team = teamRepository.create({
            name,
            logo,
            player1,
            player2,
            player3,
            player4,
            player5,
            coach,
        });

        await teamRepository.save(team);

        return team;
    }
}

export default CreateTeamService;
