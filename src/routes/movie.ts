import { Router } from 'express';

import {movieController} from '../controllers/movie'
const router = Router();

router.get('/',movieController.getMovie)

router.post('/',movieController.postMovie)

router.put('/',movieController.putMovie)

router.delete('/',movieController.deleteMovie)


export default router;