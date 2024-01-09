import express from 'express'
import { createUser, login, logout, showProfile, updateProfile } from '../controllers/user.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.route('/new/user').post(createUser);

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/profile').get(isAuthenticated, showProfile);

router.route('/update/profile').put(isAuthenticated, updateProfile);

export default router;