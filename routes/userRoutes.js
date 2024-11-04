import express from "express";

import {updateUser , loggedout, deleteAccount} from '../controller/userController.js';
import  {AdminMiddelware, VerifyToken}  from "../utils/index.js";

const router = express.Router();

router.post('/update/:id',VerifyToken,updateUser);
router.get('/logout',VerifyToken,loggedout);
router.delete('/admin/deleteAccount/:id', VerifyToken, AdminMiddelware, deleteAccount);
router.delete('/deleteAccount/:id',VerifyToken,deleteAccount)

export default router;