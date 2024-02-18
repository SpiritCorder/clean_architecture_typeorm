import {Router} from "express";
import { container } from "tsyringe";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();

const categoryController = container.resolve(CategoryController);

router.route("/").get(categoryController.onGetAllCategories.bind(categoryController))
router.route("/:categoryId").get(categoryController.onGetSingleCategory.bind(categoryController))

export default router;