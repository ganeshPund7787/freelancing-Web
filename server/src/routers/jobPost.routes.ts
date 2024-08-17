import express from "express";
import { isAuthenticated } from "../middleware/Auth.middleware";
import {
  createJobPost,
  getAllPosts,
  getClientPost,
} from "../controllers/jobPost.controller";

const routes = express.Router();

routes.post("/create", isAuthenticated, createJobPost);
routes.get("/getJobPost", isAuthenticated, getClientPost);
routes.get("/getAllJobPost", isAuthenticated, getAllPosts);

export default routes;
