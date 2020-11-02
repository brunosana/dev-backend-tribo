import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Championship from '../models/Championship';
import Team from '../models/Team';

interface Request {
    id: string;
    name: string;
    start: Date;
    end: Date;
    winnerId: string;
}

class UpdateChampionshipService {
    public async execute({
        id,
        name,
        start,
        end,
        winnerId,
    }: Request): Promise<Championship> {
        if (!id) {
            throw new AppError('Id invalid');
        }
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
        const championship = await championshipRepository.findOne({
            where: { id },
        });

        if (!championship) {
            throw new AppError('Championship has not found', 404);
        }

        championship.name = name;
        championship.start = start;
        championship.end = end;
        championship.winnerId = winnerId;

        await championshipRepository.save(championship);

        return championship;
    }
}

export default UpdateChampionshipService;
