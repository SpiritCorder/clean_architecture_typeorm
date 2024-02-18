import { Lifecycle, container } from "tsyringe";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "../application/AuthService";
import { UserRepository } from "../infrastructure/inMemory/UserRepository";
import { ExternalAuthService } from "../infrastructure/services/ExternalAuthService";
import { DbInitializeSingleton } from "../config/app.datasource";
import { ProductRepository } from "../infrastructure/inMemory/ProductRepository";
import { ProductService } from "../application/ProductService";
import { ProductController } from "./controllers/ProductController";
import { CategoryRepository } from "../infrastructure/inMemory/CategoryRepository";
import { CategoryService } from "../application/CategoryService";
import { CategoryController } from "./controllers/CategoryController";


// DB
container.register("DbInitializeSingleton", {useClass: DbInitializeSingleton}, {lifecycle: Lifecycle.Singleton})

// Auth & User
container.register("IUserRepository", {useClass: UserRepository})
container.register("IExternalAuthService", {useClass: ExternalAuthService})
container.register("AuthService", {useClass: AuthService})

// Product
container.register("IProductRepository", {useClass: ProductRepository})
container.register("ProductService", {useClass: ProductService})

// Category
container.register("ICategoryRepository", {useClass: CategoryRepository})
container.register("CategoryService", {useClass: CategoryService})


