import { errorHandler } from "../utils/error.js"
import Comment from '../models/comment.model.js'


export const createComment = async(req, res, next) => {
    try {
        const {content,postId, userId} = req.body

        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to create this comment'))
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        })

        await newComment.save()

        res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Comment created successfuly ',
            data: newComment,
        })

    } catch (error) {
        next(error)
    }
}

export const viewComment = async(req, res, next) => {
    try {
        const postId = req.params.postId
        if(!postId){
            return next(errorHandler(400,'Invalid Post Id'))
        }
        const comments = await Comment.find({postId:postId}).sort({createdAt: -1,})
        console.log('test')
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Comment retrieved successfuly ',
            data: comments,
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}