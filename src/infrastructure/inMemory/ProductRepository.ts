

import { IProductRepository } from "../../domains/IProductRepository";
import { Product } from "../../domains/entity/Product";
import { DbInitializeSingleton } from "../../config/app.datasource";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductRepository implements IProductRepository {

    constructor(@inject("DbInitializeSingleton") private readonly db: DbInitializeSingleton) {}

    async findMany(page?: number | undefined, limit?: number | undefined): Promise<Product[]> {
        return this.db
                    .getRepository(Product)
                    .find({
                        relations: {
                            category: true
                        },
                        skip: (page && limit) ? (page - 1) * limit : 0,
                        take: limit
                    });
    }

    async findUnique(productId: number): Promise<Product | null> {

        return this.db
                    .getRepository(Product)
                    .findOne({
                        where: {id: productId},
                        relations: {
                            category: true
                        }
                    })
    }

    async findManyByIds(productIds: number[]) {
        return this.db
                    .getRepository(Product)
                    .createQueryBuilder("product")
                    .where("product.id IN (:...ids)", {ids: productIds})
                    .leftJoinAndSelect("product.category", "category")
                    .getMany();
    }

}