import {Router} from "express";
import { container } from "tsyringe";
import { ProductController } from "../controllers/ProductController";

const router = Router();


const productController = container.resolve(ProductController);

router.route("/").get(productController.onGetAllProducts.bind(productController))
router.route("/cart").get(productController.onGetAllProductsInCart.bind(productController))
router.route("/:productId").get(productController.onGetSingleProduct.bind(productController))

export default router;