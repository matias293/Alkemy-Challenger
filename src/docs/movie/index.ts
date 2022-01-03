import getMovie from './getMovie';
import deleleteMovie from './deleleteMovie';
import getMovies from './getMovies';
import patchMovie from './patchMovie';
import postMovie from './postMovie';

export default {
  '/movie/:id': {
    ...getMovie,
  },
  '/movie': {
    ...getMovie,
    ...deleleteMovie,
    ...getMovies,
    ...patchMovie,
    ...postMovie,
  },
};
