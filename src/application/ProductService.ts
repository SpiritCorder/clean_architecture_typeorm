
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domains/IProductRepository";


@injectable()
export class ProductService {

    constructor(
        @inject("IProductRepository") private readonly productRepository: IProductRepository
    ) {}

    async getAllProducts(page?: number, limit?: number) {
        return this.productRepository.findMany(page, limit);
    }

    async getSingleProduct(productId: number) {
        return this.productRepository.findUnique(productId);
    }

    async getAllProductsByIds(ids: number[]) {
        return this.productRepository.findManyByIds(ids);
    }
}