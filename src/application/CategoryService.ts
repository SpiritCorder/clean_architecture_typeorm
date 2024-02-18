
import { ICategoryRepository } from "../domains/ICategoryRepository";
import { CategoryRepository } from "../infrastructure/inMemory/CategoryRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class CategoryService {

    constructor(
        @inject("ICategoryRepository") private readonly categoryRepositoty: ICategoryRepository
    ) {}

    async getAllCategories() {
        return this.categoryRepositoty.findMany();
    }

    async getSingleCategory(categoryId: number) {
        return this.categoryRepositoty.findUnique(categoryId);
    }
    
}