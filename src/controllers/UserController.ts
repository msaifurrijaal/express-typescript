import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";
import Role from "../db/models/Role";

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const hashed = await PasswordHelper.PasswordHashing(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      active: true,
      verified: true,
      roleId: 1,
    });

    return res
      .status(201)
      .send(Helper.responseData(201, "Created", null, user));
  } catch (error: any) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unauthorized", null, null));
    }

    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );
    if (!matched) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unauthorized", null, null));
    }

    const dataUser = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };
    const token = Helper.generateToken(dataUser);
    const refreshToken = Helper.generateRefreshToken(dataUser);

    user.accessToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
      token: token,
    };
    return res
      .status(200)
      .send(Helper.responseData(200, "OK", null, responseUser));
  } catch (error) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unauthorized", null, null));
    }

    const decodedUser = Helper.extractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(401)
        .send(Helper.responseData(401, "Unauthorized", null, null));
    }

    const token = Helper.generateToken({
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

    const resultUser = {
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helper.responseData(200, "OK", null, resultUser));
  } catch (error) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const userDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Role,
        attributes: ["id", "roleName"],
      },
    });

    console.log(user);

    if (!user) {
      return res
        .status(404)
        .send(Helper.responseData(404, "User not found", null, null));
    }

    user.password = "";
    user.accessToken = "";
    return res.status(200).send(Helper.responseData(200, "OK", null, user));
  } catch (error) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(200)
        .send(Helper.responseData(200, "User logout", null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(Helper.responseData(200, "User logout", null, null));
    }

    await user.update({ accessToken: null }, { where: { email: email } });
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .send(Helper.responseData(200, "User logout", null, null));
  } catch (error) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

export default { register, login, refreshToken, userDetail, logout };
