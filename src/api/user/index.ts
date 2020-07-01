import { Router } from 'express';
import UserController from './controller';

const router = Router();
const userController = new UserController();

router.post('./login', userController.loginUser);
router.post('./signup', userController.signupUser);
// router.get('./', userController.getDetails);
// router.delete('./', userController.deleteUser);
// router.put('./', userController.updateUser);

export default router;
