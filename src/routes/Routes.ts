import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";
import MasterMenuController from "../controllers/MasterMenuController";
import MenuValidation from "../middleware/validation/MenuValidation";
import SubMenuController from "../controllers/SubMenuController";
import RoleMenuAccessController from "../controllers/RoleMenuAccessController";

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

// Master Menu Routing
router.post(
  "/menu",
  MenuValidation.createMenuValidation,
  Authorization.authenticated,
  Authorization.adminRole,
  MasterMenuController.createMenu
);
router.get(
  "/menu",
  Authorization.authenticated,
  Authorization.adminRole,
  MasterMenuController.getListMenu
);
router.get(
  "/menu/get/all",
  Authorization.authenticated,
  Authorization.superUser,
  MasterMenuController.getAllMenu
);
router.get(
  "/menu/:id",
  Authorization.authenticated,
  Authorization.adminRole,
  MasterMenuController.getDetailMenu
);
router.patch(
  "/menu/:id",
  MenuValidation.createMenuValidation,
  Authorization.authenticated,
  Authorization.adminRole,
  MasterMenuController.updateMenu
);
router.delete(
  "/menu/:id",
  Authorization.authenticated,
  Authorization.adminRole,
  MasterMenuController.softDeleteMenu
);
router.delete(
  "/menu/permanent/:id",
  Authorization.authenticated,
  Authorization.superUser,
  MasterMenuController.deletePermanent
);

// Submenu routing
router.post(
  "/sub-menu",
  MenuValidation.createSubmenuValidation,
  Authorization.authenticated,
  Authorization.adminRole,
  SubMenuController.createSubMenu
);
router.get(
  "/sub-menu",
  Authorization.authenticated,
  Authorization.adminRole,
  SubMenuController.getListSubMenu
);
router.get(
  "/sub-menu/get/all",
  Authorization.authenticated,
  Authorization.superUser,
  SubMenuController.getAllSubMenu
);
router.get(
  "/sub-menu/:id",
  Authorization.authenticated,
  Authorization.adminRole,
  SubMenuController.getDetailSubMenu
);
router.patch(
  "/sub-menu/:id",
  MenuValidation.createSubmenuValidation,
  Authorization.authenticated,
  Authorization.adminRole,
  SubMenuController.updateSubMenu
);
router.delete(
  "/sub-menu/:id",
  Authorization.authenticated,
  Authorization.adminRole,
  SubMenuController.softDelete
);
router.delete(
  "/sub-menu/permanent/:id",
  Authorization.authenticated,
  Authorization.superUser,
  SubMenuController.deletePermanent
);

// Role Menu Access
router.post(
  "/role-menu-access",
  MenuValidation.createRoleMenuAccess,
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.createAccess
);
router.get(
  "/role-menu-access",
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.getList
);
router.get(
  "/role-menu-access/get/all",
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.getAll
);
router.get(
  "/role-menu-access/:id",
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.getDetail
);
router.patch(
  "/role-menu-access/:id",
  MenuValidation.createRoleMenuAccess,
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.updateAccess
);
router.delete(
  "/role-menu-access/:id",
  Authorization.authenticated,
  Authorization.superUser,
  RoleMenuAccessController.softDelete
);

export default router;
