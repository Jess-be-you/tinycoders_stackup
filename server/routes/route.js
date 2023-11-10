import express from 'express';
import { singupUser,loginUser } from '../controller/user-controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);
// router.post('/logout', logoutUser);


export default router;