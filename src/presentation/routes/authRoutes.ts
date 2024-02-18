import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { container } from "tsyringe";


// const db = DbInitializeSingleton.getInstance();
// const userRepository = new UserRepository();
// const externaleAuthService = new ExternalAuthService();
// const authService = new AuthService(userRepository, externaleAuthService);
// const authController = new AuthController(authService);

// register dependecies to the container


const authController = container.resolve(AuthController);

const router = Router();

router.route("/signup").post(authController.onSignUp.bind(authController));
router.route("/signin").post(authController.onSignIn.bind(authController));
router.route("/refresh").get(authController.onRefresh.bind(authController));
router.route("/signout").get(authController.onSignOut.bind(authController))

export default router;