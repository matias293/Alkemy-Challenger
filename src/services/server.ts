import express from 'express';
import * as http from 'http';
import { ErrorRequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';

import charactersRouter from '../routes/characters';
import authRoutes from '../routes/auth';
import movieRouter from '../routes/movie';
import Character from '../models/character';
import Genero from '../models/genero';
import Movie from '../models/movie';
import MovieCharacter from '../models/movie_character';
import docs from '../docs/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Movie.belongsTo(Genero, {
  as: 'genre',
  foreignKey: 'genreId',
});

Movie.belongsToMany(Character, {
  as: 'characters',
  through: 'movieCharacter',
  foreignKey: 'movieId',
  otherKey: 'characterId',
});

Character.belongsToMany(Movie, {
  as: 'movies',
  through: 'movieCharacter',
  foreignKey: 'characterId',
  otherKey: 'movieId',
});

Genero.hasMany(Movie, {
  as: 'movies',
  foreignKey: 'genreId',
});

app.use('/characters', charactersRouter);
app.use('/auth', authRoutes);
app.use('/movie', movieRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500);

  res.send({
    error: {
      status: error.statusCode || 500,
      message: error.message,
    },
  });
};

app.use(errorHandler);

const myServer = new http.Server(app);

export default myServer;
