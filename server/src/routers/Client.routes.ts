import express from "express";
import {
  CreateClient,
  getAllClient,
  // getClient,
  UpdateClient,
} from "../controllers/Client.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";

const route = express.Router();

route.post("/register", CreateClient);
route.put("/update-client", isAuthenticated, UpdateClient);
route.get("/getAll", isAuthenticated, getAllClient);
// route.get("/:id", isAuthenticated, getClient);

export default route;
