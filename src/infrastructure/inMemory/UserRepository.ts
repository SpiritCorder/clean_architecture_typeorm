import { IUserRepository } from "../../domains/IUserRepository";
import { User } from "../../domains/entity/User";
import { DbInitializeSingleton } from "../../config/app.datasource";
import { DataSource } from "typeorm";
// import { myDataSource } from "../../presentation";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {

    // private readonly db: DbInitializeSingleton;

    constructor(@inject("DbInitializeSingleton") private readonly db: DbInitializeSingleton) {
        // this.db = myDataSource
    }

    async create(user: User): Promise<User> {
        return this.db.manager.save(user);
    }

    async findUnique(userId: string) {
        console.log(process.cwd());
        return this.db
                    .getRepository(User)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.addresses", "address")
                    .where("user.id = :id", {id: userId})
                    .getOne()
    }

}