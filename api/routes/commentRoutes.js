import express from 'express'
import { createComment, deleteComment, editComment, getcomments, likeComment, viewComment } from '../controllers/commentController.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

// comment
router.post('/comment-create', verifyToken, createComment)
router.get('/comment-view/:postId', viewComment)

// comment likes
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);





export default router