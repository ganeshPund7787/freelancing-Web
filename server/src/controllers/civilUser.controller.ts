import { Request, Response, NextFunction } from "express";
import { CivilUser } from "../models/civilUser.model";
import { errorHandler } from "../utils/error.Handler";
import { ProjectsType } from "../shared/types";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req._id;

    let user = await CivilUser.findById(id);
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    await CivilUser.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const updatedUser = await CivilUser.findById(id);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const addLanAndEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req._id;
    let user = await CivilUser.findById(id);
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    if (req.body.language) {
      const { language } = req.body;

      if (user.languages.includes(language)) {
        return next(errorHandler(404, "Already added"));
      }
      user.languages.push(language);

      await user.save();

      const finalUser = await CivilUser.findById(id).select("-password");
      return res.status(200).json(finalUser);
    } else {
      user.education.push(req.body);
      await user.save();

      const finalUser = await CivilUser.findById(id).select("-password");

      return res.status(200).json(finalUser);
    }
  } catch (error) {
    next(error);
  }
};

export const addSkillsAndWork = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req._id;
    let user = await CivilUser.findById(id);

    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    if (req.body.skill) {
      user.skills.push(req.body.skill);
      await user.save();

      const finalUser = await CivilUser.findById(id).select("-password");
      return res.status(200).json(finalUser);
    } else {
      user.workExperience.push(req.body);
      await user.save();

      const finalUser = await CivilUser.findById(id).select("-password");
      return res.status(200).json(finalUser);
    }
  } catch (error) {
    next(error);
  }
};

export const UserAchivements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    success: false,
    message: "Hello",
  });
};

export const AddProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req._id;
    const user = await CivilUser.findById(userId);

    if (!user) {
      return next(errorHandler(400, "User is not found"));
    }

    user.projects.push(req.body);

    await user.save();

    const finalUser = await CivilUser.findById(userId).select("-password");
    return res.status(200).json(finalUser);
  } catch (error: any) {
    next(error);
  }
};

export const DeleteProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req._id;
    const ProjectId = req.params.id;

    let user = await CivilUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.projects = user.projects?.filter(
      (project) => project._id.toString() !== ProjectId
    );

    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Project deleted successfully", updatedUser });
  } catch (error: any) {
    next(error.message);
  }
};
