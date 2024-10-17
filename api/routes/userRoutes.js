import express from 'express'
import { deleteUser, signoutUser, test, updateUser, viewUsers } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)

router.put('/update/:id', verifyToken , updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.post('/signout', signoutUser)
router.get('/view', verifyToken, viewUsers)

export default router