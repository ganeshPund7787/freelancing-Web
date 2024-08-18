import express from "express";
import {
  googleLoginCllient,
  googleLoginUser,
  Login,
  LoginClient,
  logOut,
  Register,
} from "../controllers/civilUserAuth.controller";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login, LoginClient);
router.get("/logout", logOut);
router.post("/OAuth-login", googleLoginUser, googleLoginCllient);
googleLoginCllient;
export default router;
