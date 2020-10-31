import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Team from '../models/Team';

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

        return team;
    }
}

export default GetTeamService;
