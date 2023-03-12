import express from 'express';
import { authMiddleware } from '../../../middlewares/authmiddleware.js';
import {createBlog, getBlog, getBlogs, deleteBlog, updateBlog} from '../controllers/blogControllers.js';

const router = express.Router();
router.route('/').get(authMiddleware ,getBlogs).post(authMiddleware, createBlog);
router.route('/:id').get(authMiddleware, getBlog).delete(authMiddleware, deleteBlog).put(authMiddleware, updateBlog);

export const blogRouter = router;