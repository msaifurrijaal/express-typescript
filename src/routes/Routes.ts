import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

// Route Role
router.get("/role", Authorization.authenticated, RoleController.getRole);
router.get("/role/:id", RoleController.getRoleById);
router.post("/role", RoleController.createRole);
router.put("/role/:id", RoleController.updateRole);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

// Route User
router.post(
  "/user/signup",
  UserValidation.registerValidation,
  UserController.register
);
router.post("/user/login", UserController.login);
router.get("/user/refresh-token", UserController.refreshToken);

export default router;
