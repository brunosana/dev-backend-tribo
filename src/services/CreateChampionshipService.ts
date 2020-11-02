import { getRepository } from 'typeorm';
import { isAfter } from 'date-fns';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import Team from '../models/Team';

interface Request {
    name: string;
    start: Date;
    end: Date;
    winnerId: string;
}

class CreateChampionshipService {
    public async execute({
        name,
        start,
        end,
        winnerId,
    }: Request): Promise<Championship> {
        if (!name) {
            throw new AppError('Name invalid');
        }
        if (!start) {
            throw new AppError('Start date championship invalid');
        }
        if (!end) {
            throw new AppError('Start date championship invalid');
        }

        if (winnerId) {
            const teamRepository = getRepository(Team);
            const team = await teamRepository.findOne({
                where: { id: winnerId },
            });

            if (!team) {
                throw new AppError('Winner id not found', 404);
            }
        }

        const championshipRepository = getRepository(Championship);
        const checkIfChampionshipExists = await championshipRepository.findOne({
            where: { name },
        });

        if (checkIfChampionshipExists) {
            const existingChampionship = checkIfChampionshipExists;
            if (!isAfter(start, existingChampionship.end)) {
                throw new AppError(
                    'Have a championship with this name in progress',
                );
            }
        }

        const championship = championshipRepository.create({
            name,
            start,
            end,
            winnerId,
        });

        await championshipRepository.save(championship);

        return championship;
    }
}

export default CreateChampionshipService;
