import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

// Route Role
router.get("/role", Authorization.authenticated, RoleController.getRole);
router.get(
  "/role/:id",
  Authorization.authenticated,
  RoleController.getRoleById
);
router.post(
  "/role",
  Authorization.authenticated,
  Authorization.adminRole,
  RoleController.createRole
);
router.put(
  "/role/:id",
  Authorization.authenticated,
  Authorization.adminRole,
  RoleController.updateRole
);
router.put("/role/:id", Authorization.authenticated, RoleController.updateRole);
router.delete(
  "/role/:id",
  Authorization.authenticated,
  Authorization.superUser,
  RoleController.deleteRole
);

// Route User
router.post(
  "/user/signup",
  UserValidation.registerValidation,
  UserController.register
);
router.post("/user/login", UserController.login);
router.get("/user/refresh-token", UserController.refreshToken);
router.get(
  "/user/current-user",
  Authorization.authenticated,
  UserController.userDetail
);
router.get("/user/logout", Authorization.authenticated, UserController.logout);

export default router;
