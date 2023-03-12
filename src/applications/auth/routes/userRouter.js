import express from 'express';
import { registerUser, getUser,
    getUsers,
    updateUser,
    deleteUser, loginUser} from '../controllers/userController.js';
const router = express.Router();
router.route('/').get(getUsers).post(registerUser);
router.route('/login').post(loginUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export const userRouter = router;