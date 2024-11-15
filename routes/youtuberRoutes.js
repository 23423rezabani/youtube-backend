import express from "express";
import {VerifyToken} from "../utils/index.js"
import {createYoutuber,youtuberVideo,findYoutuber,findVideoByYoutuber,findVIdeoDelete} from "../controller/youtuberController.js"
const router = express.Router();

router.post('/createYoutuber',VerifyToken,createYoutuber)
router.post('/createvideo/:id',VerifyToken,youtuberVideo)
router.get('/findalltuber',findYoutuber);
router.get('/channel/:id/video',findVideoByYoutuber)
router.delete('/ytuber/:id/video/:videoId',VerifyToken,findVIdeoDelete)
export default router