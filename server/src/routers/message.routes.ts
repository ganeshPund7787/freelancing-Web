import express from "express";
import {
  getMessages,
  sendDynamicEmail,
  sendMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.post("/send-msg/:id", sendMessage);
router.get("/get-msg/:id", getMessages);
router.post("/send-email", sendDynamicEmail);

export default router;
