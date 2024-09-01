import express from "express";
import { GetCivilUser, GetCLientUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";

const route = express.Router();

route.get("/get-user/:id", isAuthenticated, GetCivilUser, GetCLientUser);

export default route;
