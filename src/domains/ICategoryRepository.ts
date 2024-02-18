import { Category } from "./entity/Category";


export interface ICategoryRepository {
    findMany(): Promise<Category[]>;
    findUnique(categoryId: number): Promise<Category | null>;
}