import { Request, Response, NextFunction } from "express";
import { Post } from "../models/post.model";
import { errorHandler } from "../utils/error.Handler";
import { CivilUserType, PostType } from "../shared/types";
import { Client } from "../models/Client.model";
import { CivilUser } from "../models/civilUser.model";

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

// export const GetAllPosts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const result: PostType[] = await Post.find().sort({ createdAt: -1 });
//     console.log(`first`);
//     const users: ClientTypes | CivilUserType | any = [];

//     for (const post of result) {
//       let user = await Client.findById(post.userId).select("-password");
//       if (user) {
//         users.push(user);
//         return;
//       } else {
//         user = await CivilUser.findById(post.userId).select("-password");
//         users.push(user);
//       }
//     }

//     res.status(200).json({ result, users });

//   } catch (error) {
//     next(error);
//   }
// };

export const GetAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: PostType[] | any = await Post.find().sort({ createdAt: -1 });

    const postsWithUsers = await Promise.all(
      result.map(async (post: any) => {
        let user = await Client.findById(post.userId).select("-password");
        if (!user) {
          user = await CivilUser.findById(post.userId).select("-password");
        }
        return { ...post.toObject(), user }; 
      })  
    );

    res.status(200).json(postsWithUsers);
  } catch (error) {
    next(error);
  }
};
