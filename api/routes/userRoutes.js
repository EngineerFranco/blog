import express from 'express'
import { deleteUser, getUser, signoutUser, test, updateUser, viewUsers } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)

// private
router.put('/update/:id', verifyToken , updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.post('/signout', signoutUser)
router.get('/view', verifyToken, viewUsers)


// public
router.get('/:userId', getUser)


export default router