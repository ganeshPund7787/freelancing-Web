import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";

const route = express.Router();

route.post("/send-msg/:id", sendMessage);
route.get("/get-msg/:id", getMessages);

export default route;
