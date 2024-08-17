import express from "express";
import {
  Login,
  LoginClient,
  logOut,
  Register,
} from "../controllers/civilUserAuth.controller";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login, LoginClient);
router.get("/logout", logOut);

export default router;
