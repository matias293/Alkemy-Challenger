import components from './components';
import tags from './tags';
import auth from './auth/index';
import character from './character/index';
import movie from './movie/index';

export default {
  openapi: '3.0.3',
  info: {
    title: ' API RESTFUL FOR ALKEMY',
    version: '1.0.0',
    description: `It's a database for managed movies, characters and gender `,
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'matias',
      email: 'matiasmarin45@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Development server',
    },
  ],
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...character,
    ...movie,
  },
};
