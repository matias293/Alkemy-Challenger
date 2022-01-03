import { Router } from 'express';

import { characterController } from '../controllers/characters';
import { validarJWT } from '../middleware/validateJWT';

const router = Router();

router.get('/:id', characterController.getCharacter);

router.get('/', characterController.getCharacters);

router.post('/', validarJWT, characterController.postCharacter);

router.patch(
  '/:id',
  validarJWT,
  characterController.characterExist,
  characterController.patchCharacter,
);

router.delete(
  '/:id',
  validarJWT,
  characterController.characterExist,
  characterController.deleteCharacter,
);

export default router;
