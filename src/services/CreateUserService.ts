import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    name?: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name = '',
        email,
        password,
    }: Request): Promise<User> {
        if (!email) {
            throw new AppError('Email must be valid');
        }
        if (!password) {
            throw new AppError('Password must be valid');
        }

        const userRepository = getRepository(User);

        const checkEmailExists = await userRepository.findOne({
            where: { email },
        });

        if (checkEmailExists) {
            throw new AppError('Email already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
