import { User } from "./entity/User";


export interface IUserRepository {
    create(user: User): Promise<User>;
    findUnique(userId: string): Promise<User | null>;
}