import { NextFunction, Request, Response } from "express";
import { JobPost } from "../models/jobPost.model";
import { errorHandler } from "../utils/error.Handler";
import { Client } from "../models/Client.model";
import { JobPostType, JobSearchResponce } from "../shared/Client.types";

export const createJobPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { heading } = req.body;
    const clientId = req._id;
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

    const postWithUsers = await Promise.all(
      allPosts.map(async (jobPost: any) => {
        let user = await Client.findById(jobPost.clientId).select("-password");
        return { ...jobPost.toObject(), user };
      })
    );
    res.status(200).json(postWithUsers);
  } catch (error: any) {
    next(error.message);
  }
};

const constructSearchQuery = (queryParams: any) => {
  const constructedQuery: any = {};

  if (queryParams.experianceLevel) {
    constructedQuery.experianceLevel = new RegExp(
      queryParams.experianceLevel,
      "i"
    );
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
      $lte: parseInt(queryParams.salary.toString()),
    };
  }

  return constructedQuery;
};

export const SearchJobPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = constructSearchQuery(req.query);
    console.log(query);

    console.log("Direct Query : ", req.query);

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;

    const result = await JobPost.find(query).skip(skip).limit(pageSize);

    const total = await JobPost.countDocuments(query);

    const responce: JobSearchResponce = {
      data: result,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(responce);
  } catch (error) {
    next(error);
  }
};

export const SearchHeadingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const heading = req.query.heading as string;
    const result = await JobPost.find({
      heading: { $regex: heading, $options: "i" },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
