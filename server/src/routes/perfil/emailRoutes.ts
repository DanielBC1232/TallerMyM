import { Router } from 'express';
import { sendEmailController } from '../../controllers/perfil/emailController';

const router = Router();

router.post('/send-email', sendEmailController);

export default router;