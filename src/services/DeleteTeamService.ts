import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Team from '../models/Team';

class DeleteTeamService {
    public async execute(id: string): Promise<void> {
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

        await teamRepository.remove(team);
    }
}

export default DeleteTeamService;
