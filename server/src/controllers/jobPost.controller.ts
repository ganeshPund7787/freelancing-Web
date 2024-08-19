import { NextFunction, Request, Response } from "express";
import { JobPost } from "../models/jobPost.model";
import { errorHandler } from "../utils/error.Handler";
import { JobPostType } from "../shared/Client.types";

export const createJobPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { heading } = req.body;
    const clientId = req._id;
    console.log(req.body);
    const isPostExist = await JobPost.findOne({ heading });
    if (isPostExist) return next(errorHandler(400, "Post Already exist"));

    await JobPost.create({ ...req.body, clientId });

    res.status(202).json({
      message: "Post Create",
    });
  } catch (error) {
    next(error);
  }
};

export const getClientPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobPosts = await JobPost.find({ clientId: req._id });
    res.status(200).json(jobPosts);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await JobPost.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (error: any) {
    next(error.message);
  }
};

export const SearchJobPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = constructSearchQuery(req.query);
    const result = await JobPost.find(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.experianceLevel) {
    constructedQuery.$or = [
      { experianceLevel: new RegExp(queryParams.experianceLevel, "i") },
    ];
  }

  if (queryParams.HoursePerWeak) {
    constructedQuery.HoursePerWeak = {
      $gte: parseInt(queryParams.HoursePerWeak.toString()),
    };
  }

  if (queryParams.skills) {
    constructedQuery.skills = {
      $all: Array.isArray(queryParams.skills)
        ? queryParams.skills
        : [queryParams.skills],
    };
  }

  if (queryParams.salary) {
    constructedQuery.salary = {
      $lte: parseInt(queryParams.salary).toString(),
    };
  }

  return constructedQuery;
};
