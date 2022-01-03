import getCharacter from './getCharacter';
import getCharacters from './getCharacters';
import postCharacter from './postCharacter';
import deleteCharacter from './deleteCharacter';
import patchCharacter from './patchCharacter';

export default {
  '/characters/:id': {
    ...getCharacter,
  },
  '/characters': {
    ...getCharacters,
    ...postCharacter,
    ...deleteCharacter,
    ...patchCharacter,
  },
};
