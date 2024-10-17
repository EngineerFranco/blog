import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createPost, deletePost, updatePost, viewPosts } from '../controllers/postController.js'

const router = express.Router()

router.post('/create', verifyToken, createPost)
router.get('/view', verifyToken, viewPosts)
router.delete('/delete/:postId/:userId', verifyToken, deletePost)
router.put('/update/:postId/:userId', verifyToken, updatePost)

export default router