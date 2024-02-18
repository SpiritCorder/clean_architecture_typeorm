import { NextFunction, Request, Response } from "express";
import { ProductService } from "../../application/ProductService";
import { inject, injectable } from "tsyringe";



@injectable()
export class ProductController {

    constructor(
        @inject("ProductService") private readonly productService: ProductService
    ) {}

    async onGetAllProducts(req: Request, res: Response, next: NextFunction) {

        const {page, limit} = req.query;

        try {
            const products = await this.productService.getAllProducts(Number(page), Number(limit));
            res.status(200).json({message: "success", data: products});
        } catch (err) {
            next(err);
        }
    }

    async onGetSingleProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = Number(req.params.productId);
            const product = await this.productService.getSingleProduct(productId);
            res.status(200).json({message: "success", data: product});
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async onGetAllProductsInCart(req: Request, res: Response, next: NextFunction) {
        const itemsRaw = req.query.items;

        if(!itemsRaw) {
            return res.status(400).json({message: "Required query parameters are missing"});
        }

        if(typeof itemsRaw !== "string") {
            return res.status(400).json({message: "Invalid query parameter type"});
        }

        try {
            JSON.parse(itemsRaw);
        } catch (err) {
            return res.status(400).json({message: "Invalid JSON type"});
        }

        const items: Array<{id: number; quantity: number;}> = JSON.parse(itemsRaw);

        if(!Array.isArray(items) || typeof items[0] !== "object" || !items[0]['id'] || !items[0]['quantity']) {
            return res.status(400).json({message: "Invalid argument type"});
        }

        try {
            const products = await this.productService.getAllProductsByIds(items.map(i => Number(i.id)));
            res.status(200).json({message: "success", data: products});
        } catch (err) {
            next(err);
        }
    }
}