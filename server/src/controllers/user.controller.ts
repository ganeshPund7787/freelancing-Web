import { NextFunction, Request, Response } from "express";
import { CivilUser } from "../models/civilUser.model";
import { Client } from "../models/Client.model";
import { errorHandler } from "../utils/error.Handler";
import { Post } from "../models/post.model";
import { JobPost } from "../models/jobPost.model";

export const GetCivilUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user = await CivilUser.findById(userId).select("-password");

    if (!user) {
      return next();
    }
    console.log(user.fullName);

    const Posts = await Post.find({ userId });
    res.status(200).json({ user, Posts });
  } catch (error) {
    next(error);
  }
};

export const GetCLientUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user = await Client.findById(userId).select("-password");

    if (!user) {
      return next(errorHandler(400, "Techical issue ! refresh the page"));
    }
    console.log(user.fullName);
    const userJobPost = await JobPost.find({ clientId: userId });
    const userPosts = await Post.find({ userId });

    res.status(200).json({ user, userJobPost, userPosts });
  } catch (error) {
    next(error);
  }
};
