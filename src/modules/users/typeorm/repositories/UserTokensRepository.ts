import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';


@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
    
    // funcao personalizada extendendo o ORM
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                token
            }
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken | undefined> {
        const userToken = await this.create({
            user_id
        });
        
        await this.save(userToken)
        console.log(userToken);
        return userToken;
    }

}

export default UserTokensRepository;