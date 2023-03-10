import {Router} from 'express';
import {Auth} from '../middlewares/auth';
import * as ApiController from '../controllers/apiController';


const router = Router();


router.get('/ping', ApiController.ping);

router.get('/register', ApiController.register);
router.get('/login', ApiController.login);

//inserindo um middleware na rota, para ser executado antes de ir para o controller
router.get('/list', Auth.private, ApiController.list);


export default router;