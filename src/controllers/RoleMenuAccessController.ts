import { Request, Response } from "express";
import Role from "../db/models/Role";
import RoleMenuAccess from "../db/models/RoleMenuAccess";
import Submenu from "../db/models/SubMenu";
import Helper from "../helpers/Helper";

const createAccess = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleId, submenuId } = req.body;

    const access = await RoleMenuAccess.create({
      roleId,
      submenuId,
      active: true,
    });

    return res
      .status(201)
      .send(Helper.responseData(201, "Created", null, access));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};
const getList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await RoleMenuAccess.findAll({
      where: {
        active: true,
      },
      include: [
        {
          model: Submenu,
          attributes: ["name"],
        },
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });

    return res.status(200).send(Helper.responseData(200, "OK", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};
const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await RoleMenuAccess.findAll({
      include: [
        {
          model: Submenu,
          attributes: ["name"],
        },
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });

    return res.status(200).send(Helper.responseData(200, "OK", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};
const getDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const menu = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu) {
      return res
        .status(404)
        .send(Helper.responseData(404, "NotFound", null, null));
    }
    return res.status(200).send(Helper.responseData(200, "OK", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};
const updateAccess = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleId, submenuId } = req.body;
    const menu = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu) {
      return res
        .status(404)
        .send(Helper.responseData(404, "NotFound", null, null));
    }

    menu.roleId = roleId;
    menu.submenuId = submenuId;
    await menu.save();
    return res
      .status(200)
      .send(Helper.responseData(200, "Updated", null, null));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};
const softDelete = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const menu = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    if (!menu) {
      return res
        .status(404)
        .send(Helper.responseData(404, "NotFound", null, null));
    }

    menu.active = false;
    await menu.save();
    return res
      .status(200)
      .send(Helper.responseData(200, "Updated", null, null));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

export default {
  createAccess,
  getAll,
  getList,
  getDetail,
  updateAccess,
  softDelete,
};
