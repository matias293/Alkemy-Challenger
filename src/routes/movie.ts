import { Router } from 'express';

import { movieController } from '../controllers/movie';
import { validarJWT } from '../middleware/validateJWT';
const router = Router();

router.get('/', movieController.getMovies);

router.get('/:id', movieController.getMovie);

router.post('/', validarJWT, movieController.postMovie);

router.put('/', validarJWT, movieController.movieExist, movieController.patch);

router.delete(
  '/',
  validarJWT,
  movieController.movieExist,
  movieController.deleteMovie,
);

export default router;
