import express from "express";
import { getUser , updateUser, getUserAccessInfo} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/access-info", getUserAccessInfo);

export default router