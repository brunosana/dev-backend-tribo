import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import User from '../models/User';
import AuthConfig from '../config/Auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        if (!email) {
            throw new AppError('Email must be valid');
        }
        if (!password) {
            throw new AppError('Password must be valid');
        }

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('Email/Passowrd invalid', 401);
        }

        const checkIfPasswordMath = await compare(password, user.password);

        if (!checkIfPasswordMath) {
            throw new AppError('Email/Passowrd invalid', 401);
        }

        const { secret, expiresIn } = AuthConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
