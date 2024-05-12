import { Request, Response } from "express";
import MasterMenu from "../db/models/MasterMenu";
import Helper from "../helpers/Helper";

const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, icon, ordering } = req.body;

    const menu = await MasterMenu.create({
      name,
      icon,
      ordering,
      active: true,
    });

    return res
      .status(201)
      .send(Helper.responseData(201, "Created", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const getListMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await MasterMenu.findAll({
      where: {
        active: true,
      },
    });

    return res.status(200).send(Helper.responseData(200, "OK", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const getAllMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const menu = await MasterMenu.findAll();

    return res.status(200).send(Helper.responseData(200, "Ok", null, menu));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const getDetailMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const menu = await MasterMenu.findOne({
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

const updateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, icon, ordering } = req.body;

    const menu = await MasterMenu.findOne({
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

    menu.name = name;
    menu.icon = icon;
    menu.ordering = ordering;

    await menu.save();

    return res
      .status(200)
      .send(Helper.responseData(200, "Updated", null, null));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const softDeleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const menu = await MasterMenu.findOne({
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
      .send(Helper.responseData(200, "Removed", null, null));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const deletePermanent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const menu = await MasterMenu.findOne({
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

    await menu.destroy();
    return res
      .status(200)
      .send(Helper.responseData(200, "Removed", null, null));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

export default {
  createMenu,
  updateMenu,
  getAllMenu,
  getListMenu,
  getDetailMenu,
  softDeleteMenu,
  deletePermanent,
};
