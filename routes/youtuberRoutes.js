import express from "express";
import {VerifyToken} from "../utils/index.js"
import {createYoutuber,youtuberVideo,findYoutuber,findVideoByYoutuber} from "../controller/youtuberController.js"
const router = express.Router();

router.post('/createYoutuber',VerifyToken,createYoutuber)
router.post('/createvideo/:id',VerifyToken,youtuberVideo)
router.get('/findalltuber',findYoutuber);
router.get('/channel/:id/video',findVideoByYoutuber)
export default router