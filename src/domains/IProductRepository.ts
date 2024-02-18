import { Product } from "./entity/Product";


export interface IProductRepository {
    findMany(page?: number, limit?: number): Promise<Product[]>;
    findUnique(productId: number): Promise<Product | null>;
    findManyByIds(productIds: number[]): Promise<Product[]>;
}