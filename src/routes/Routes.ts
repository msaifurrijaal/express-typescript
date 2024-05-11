import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/role", RoleController.getRole);
router.get("/role/:id", RoleController.getRoleById);
router.post("/role", RoleController.createRole);
router.put("/role/:id", RoleController.updateRole);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

router.post("/user/signup", UserController.register);

export default router;
