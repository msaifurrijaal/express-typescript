import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token === null) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unautorized", null, null));
    }
    const result = Helper.extractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unautorized", null, null));
    }

    res.locals.userEmail = result?.email;
    res.locals.roleId = result?.roleId;
    next();
  } catch (err: any) {
    return res.status(500).send(Helper.responseData(500, "", err, null));
  }
};

const superUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 1) {
      return res
        .status(401)
        .send(Helper.responseData(403, "Forbidden", null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.responseData(500, "", err, null));
  }
};

const adminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 2) {
      return res
        .status(401)
        .send(Helper.responseData(403, "Forbidden", null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.responseData(500, "", err, null));
  }
};

const basicUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 3) {
      return res
        .status(401)
        .send(Helper.responseData(403, "Forbidden", null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.responseData(500, "", err, null));
  }
};

export default { authenticated, superUser, adminRole, basicUser };
