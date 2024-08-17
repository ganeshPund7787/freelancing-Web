import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error.Handler";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      _id: string;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.cookie;

    // console.log("token is : ", token);

    if (!token) {
      return next(errorHandler(400, "You should login first"));
    }

    const secretKey = process.env.JWT_SECREATE_KEY_BACKEND;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }

    const user = jwt.verify(token, secretKey) as JwtPayload;

    if (!user || typeof user !== "object" || !user.id) {
      return next(errorHandler(401, "Invalid token payload"));
    }

    req._id = user.id;

    next();
  } catch (error: any) {
    console.log(`Error while auth: ${error.message}`);
    next(errorHandler(401, "Invalid token"));
  }
};
