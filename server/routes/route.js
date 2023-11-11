import express from 'express';
import { sigupUser,loginUser } from '../controller/user-controller.js';
import { createPost, deletePost, getAllPosts,getPost, updatePost } from '../controller/post-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete/:id',authenticateToken,deletePost)

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);


export default router;