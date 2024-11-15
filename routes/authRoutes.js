import express from "express";
import {signup,login,verifycode} from "../controller/authController.js";
// import { isVerified } from "../utils/index.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/signup/verify",verifycode)
router.post("/login",login);

export default router