import { Request, Response, NextFunction } from "express";
import { Client } from "../models/Client.model";
import { errorHandler } from "../utils/error.Handler";
import bcryptjs from "bcryptjs";
import { CivilUser } from "../models/civilUser.model";

export const CreateClient = async (
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

    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

    const newClient = new Client({
      ...req.body,
      password: hashedPassword,
    });

    await newClient.save();
    res.status(202).json({
      success: true,
      message: "Client register success",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ClientId = req._id;

    await Client.findByIdAndUpdate(
      ClientId,
      {
        $set: req.body,
      },
      { new: true }
    );
    const updatedClient = await Client.findById(ClientId);
    res.status(201).json(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const getAllClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId = req._id;

    const filterUsers = await Client.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error: any) {
    next(error);
  }
};
