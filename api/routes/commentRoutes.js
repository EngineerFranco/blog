import express from 'express'
import { createComment, viewComment } from '../controllers/commentController.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.post('/comment-create', verifyToken, createComment)
router.get('/comment-view/:postId', viewComment)



export default router