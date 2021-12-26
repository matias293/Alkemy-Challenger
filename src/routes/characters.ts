import { Router } from 'express';

import { characterController } from '../controllers/characters';

const router = Router();

router.get('/:id', characterController.getCharacter);

router.get('/', characterController.getCharacters);

router.post('/', characterController.postCharacter);

router.patch(
  '/:id',
  characterController.characterExist,
  characterController.patchCharacter,
);

router.delete(
  '/:id',
  characterController.characterExist,
  characterController.deleteCharacter,
);

export default router;
