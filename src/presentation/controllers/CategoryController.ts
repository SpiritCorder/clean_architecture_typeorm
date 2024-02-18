import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../../application/CategoryService";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryController {

    constructor(
        @inject("CategoryService") private readonly categoryService: CategoryService
    ) {}

    async onGetAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({message: "success", data: categories});
        } catch (err) {
            next(err);
        }
    }

    async onGetSingleCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = Number(req.params.categoryId);
            const category = await this.categoryService.getSingleCategory(categoryId);

            if(!category) {
                return res.status(404).json({message: "category not found"});
            }

            res.status(200).json({message: "success", data: category});
        } catch (err) {
            next(err);
        }
    }


}


// export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         /* WITHOUT USING QUERY BUILDER */
//         // const categories = await myDataSource.getRepository(Category).find();

//         /* QUERY BUILDER WITH Repository */
//         const categories = await myDataSource
//                                     .getRepository(Category)
//                                     .createQueryBuilder("category")
//                                     .leftJoinAndSelect("category.products", "products")
//                                     .getMany()
                                    
//         // const categories = await myDataSource
//         //                             .createQueryBuilder()
//         //                             .select("category")
//         //                             .from(Category, "category")
//         //                             .where("category.id = :id", {id: 5})
//         //                             .getOne()

//         /* QUERY BUILDER WITH DataSource */
//         // const categories = await myDataSource
//         //                             .createQueryBuilder()
//         //                             .select("category")
//         //                             .from(Category, "category")
//         //                             .leftJoinAndSelect("category.products", "products")
//         //                             .getMany()
                                    
//         res.status(200).json({message: "success", data: categories});
//     } catch(err) {
//         console.log(err);
//     }
        
// }