
import { ICategoryRepository } from "../../domains/ICategoryRepository";
import { Category } from "../../domains/entity/Category";
import { DbInitializeSingleton } from "../../config/app.datasource";
import { inject, injectable } from "tsyringe";



@injectable()
export class CategoryRepository implements ICategoryRepository {

    constructor(@inject("DbInitializeSingleton") private readonly db: DbInitializeSingleton) {}

    async findMany(): Promise<Category[]> {
        return this.db
                    .getRepository(Category)
                    .createQueryBuilder("category")
                    .getMany()
    }

    async findUnique(categoryId: number): Promise<Category | null> {
        return this.db
                    .getRepository(Category)
                    .createQueryBuilder("category")
                    .where("category.id = :id", {id: categoryId})
                    .getOne()
    }

}