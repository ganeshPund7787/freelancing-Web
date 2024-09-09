import { Request, Response, NextFunction } from "express";
import { Client } from "../models/Client.model";
import { errorHandler } from "../utils/error.Handler";
import bcryptjs from "bcryptjs";
import { CivilUser } from "../models/civilUser.model";
import { sendMail } from "../utils/mailer";

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

    const user = await newClient.save();

    const emailResponse = await sendMail(
      process.env.EMAIL_USER as string,
      user?.email,
      "Sign up in civilHub",
      `Hello ${user.fullName},
Thank you for signing up on CivilHub! We're excited to help you connect with top civil engineers for your projects. You can now post jobs and start hiring.`,
      `<!DOCTYPE html>
      <html lang="en">
     <body>
       <h1>Welcome to CivilHub,  ${user.fullName}!</h1>
       <p>Thank you for joining CivilHub. We're thrilled to have you onboard!</p>
      <p>Start exploring top civil engineers for your projects right away. Simply <a href="http://freelancing-web.onrender.com/sign-in">log in</a> to post a job.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best Regards,<br/>The CivilHub Team</p>
      </body>
    </html>
`
    );
    
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
