import express from "express";
import { isAuthenticated } from "../middleware/Auth.middleware";
import {
  createJobPost,
  getAllPosts,
  getClientPost,
  SearchHeadingPost,
  SearchJobPosts,
} from "../controllers/jobPost.controller";

const routes = express.Router();

routes.post("/create", isAuthenticated, createJobPost);
routes.get("/getJobPost", isAuthenticated, getClientPost);
routes.get("/getAllJobPost", isAuthenticated, getAllPosts);
routes.get("/search", isAuthenticated, SearchJobPosts);
routes.get("/search-heading", isAuthenticated, SearchHeadingPost);

export default routes;
