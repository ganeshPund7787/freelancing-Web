import express from "express";
import {
  addLanAndEducation,
  AddProject,
  addSkillsAndWork,
  DeleteProjects,
  updateUser,
  UserAchivements,
} from "../controllers/civilUser.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { getAllCivilUsers } from "../controllers/civilUserAuth.controller";
const route = express.Router();

route.put("/update", isAuthenticated, updateUser);
route.put("/addLanAndEducation", isAuthenticated, addLanAndEducation);
route.put("/addSkillsAndWork", isAuthenticated, addSkillsAndWork);
route.put("/addAchvements", isAuthenticated, UserAchivements);
route.put("/AddProject", isAuthenticated, AddProject);
route.get("/getAllCivil", isAuthenticated, getAllCivilUsers);
route.get("/delete-Project/:id", isAuthenticated, DeleteProjects);


export default route;
