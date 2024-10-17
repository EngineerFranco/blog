import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createPost, viewPosts } from '../controllers/postController.js'

const router = express.Router()

router.post('/create', verifyToken, createPost)
router.get('/view', verifyToken, viewPosts)

export default router