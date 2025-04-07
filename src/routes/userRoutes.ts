import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAllUsers as any);

router.get('/:id', userController.getUserById as any);

router.post('/', userController.createUser as any);

router.put('/:id', userController.updateUser as any);

router.delete('/:id', userController.deleteUser as any);

export default router;
