import { Request, Response, NextFunction } from "express";
import { CivilUser } from "../models/civilUser.model";
import { errorHandler } from "../utils/error.Handler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from "../models/Client.model";

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullName } = req.body;

    const isUserExist = await CivilUser.findOne({
      $or: [{ email }, { fullName }],
    });

    const isClientUser = await Client.findOne({
      $or: [{ email }, { fullName }],
    });

    if (isUserExist || isClientUser) {
      return next(errorHandler(400, "User already exists"));
    }

    const date = new Date(req.body.dateOfBirth).toISOString().split("T")[0];
    const nowDate = new Date(Date.now()).toISOString().split("T")[0];

    if (date > nowDate) {
      return next(errorHandler(400, "Invalid Birth Date"));
    }

    req.body.dateOfBirth = date;

    req.body.password = bcryptjs.hashSync(req.body.password, 8);

    const newUser = new CivilUser(req.body);

    await newUser.save();

    res.status(202).json({
      success: true,
      message: "Account created",
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let isUserExist = await CivilUser.findOne({ email });

    if (!isUserExist) {
      next();
      return;
    }

    const validPassword = bcryptjs.compareSync(password, isUserExist.password);

    if (!validPassword) {
      return next(errorHandler(402, "Incorrect email or Password"));
    }

    const cookie = jwt.sign(
      { id: isUserExist._id },
      process.env.JWT_SECREATE_KEY_BACKEND as string
    );

    const userObj = isUserExist.toObject();
    const { password: _, ...rest } = userObj;

    res
      .cookie("cookie", cookie, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error: any) {
    next(error);
  }
};

export const LoginClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let isUserExist = await Client.findOne({ email });

    if (!isUserExist) {
      return next(errorHandler(400, "Email not found"));
    }

    const validPassword = bcryptjs.compareSync(password, isUserExist.password);

    if (!validPassword) {
      return next(errorHandler(402, "Incorrect email or Password"));
    }

    const cookie = jwt.sign(
      { id: isUserExist._id },
      process.env.JWT_SECREATE_KEY_BACKEND as string
    );

    const userObj = isUserExist.toObject();
    const { password: _, ...rest } = userObj;

    res
      .cookie("cookie", cookie, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("cookie").json({
      success: true,
      message: "User Logout Successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllCivilUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId = req._id;

    const filterUsers = await CivilUser.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error: any) {
    next(error);
  }
};

export const googleLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    let isUserExist = await CivilUser.findOne({ email });

    if (!isUserExist) {
      next();
      return;
    }

    const token = jwt.sign(
      { id: isUserExist._id },
      process.env.JWT_SECREATE_KEY_BACKEND as string
    );

    const user = isUserExist.toObject();
    const { password: _, ...rest } = user;

    res
      .cookie("cookie", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error: any) {
    next(error.message);
  }
};

export const googleLoginCllient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    let isUserExist = await Client.findOne({ email });
    if (!isUserExist) {
      return next(errorHandler(400, "email is not exist"));
    }

    const token = jwt.sign(
      { id: isUserExist._id },
      process.env.JWT_SECREATE_KEY_BACKEND as string
    );

    const user = isUserExist.toObject();
    const { password: _, ...rest } = user;

    res
      .cookie("cookie", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error: any) {
    next(error.message);
  }
};
