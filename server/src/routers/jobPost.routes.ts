import express from "express";
import { isAuthenticated } from "../middleware/Auth.middleware";
import {
  createJobPost,
  getAllPosts,
  getClientPost,
  SearchJobPosts,
} from "../controllers/jobPost.controller";

const routes = express.Router();

routes.post("/create", isAuthenticated, createJobPost);
routes.get("/getJobPost", isAuthenticated, getClientPost);
routes.get("/getAllJobPost", isAuthenticated, getAllPosts);
routes.get("/search", isAuthenticated, SearchJobPosts);

export default routes;
