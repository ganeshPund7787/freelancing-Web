import { Request, Response, NextFunction } from "express";
import { Post } from "../models/post.model";
import { errorHandler } from "../utils/error.Handler";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req._id;

    let isPostExist;
    if (req.body.image) {
      isPostExist = await Post.findOne({ image: req.body.image });
      if (isPostExist) {
        return next(errorHandler(400, "Already Posted"));
      }
    }

    const newPost = new Post({ description: req.body.description, userId });

    if (req.body.image) {
      newPost.image = req.body.image;
    }

    await newPost.save();
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    await Post.findByIdAndUpdate(
      postId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Post Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const GetPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req._id;
    const AllPost = await Post.find({ userId });
    res.json(AllPost);
  } catch (error: any) {
    next(error.message);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: "Post Deleted",
    });
  } catch (error: any) {
    next(error.message);
  }
};


