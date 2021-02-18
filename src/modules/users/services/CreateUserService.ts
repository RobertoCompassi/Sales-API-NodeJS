import AppError from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest) : Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExist = await usersRepository.findByEmail(email);
        if(emailExist){
            throw new  AppError('Email já cadastado');
        }

        const hashedPassword = await hash(password, 8);

        const user = await usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService