import express from "express"

import auth from "../middlewares/auth.js"
import { getUsers } from "../controllers/user.controller.js";

let router = express.Router();

router.get("/",auth,getUsers)

export default router