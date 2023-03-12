import express from 'express';

const router = express.Router();
router.route('/').get().post();
router.route('/:id').get().put().delete();

export const contactRouter = router;