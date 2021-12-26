import { Request, Response, NextFunction } from 'express';

import Movie from '../models/movie';
import { newMovieSchema, movieUpdateSchema } from '../helper/validators';
import {
  Error,
  MovieQuery,
  UpdateMovie,
  NewMovies,
} from '../common/interfaces/movie.interface';

class MovieC {
  async movieExist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const movie = await Movie.findByPk(id);
      if (!movie) {
        const error: Error = new Error(`Movie not exist`);
        error.statusCode = 404;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async getMovie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const movies = await Movie.findOne({
        where: { id },
        include: [{ association: 'personajes' }, { association: 'genre' }],
      });
      if (!movies) {
        const error: Error = new Error(`Did't find any character with that id`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async getMovies(req: Request, res: Response, next: NextFunction) {
    const { title, genre, order } = req.params;
    let query: MovieQuery = {};
    try {
      if (title) query.title = title;
      if (genre) query.genre = genre;
      if (order) query.order = order;

      if (Object.keys(query).length) {
        const movies = await Movie.findAll({
          where: query,
          include: [{ association: 'personajes' }, { association: 'genre' }],
        });

        if (movies.length === 0) {
          const error: Error = new Error(`Did't find any movies`);
          error.statusCode = 404;
          throw error;
        }
        res.json(movies);
      }

      const characters = await Movie.findAll({
        attributes: ['imagen', 'title', 'createdAt'],
      });

      if (characters.length === 0) {
        const error: Error = new Error(`Did't find any character`);
        error.statusCode = 404;
        throw error;
      }
      res.json(characters);
    } catch (error) {
      next(error);
    }
  }

  async postMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newMovieSchema.validateAsync(req.body);
      const newMovie: NewMovies = {
        imagen: result.imagen,
        title: result.title,
        createdAt: result.createdAt,
        calification: result.calification,
      };
      await Movie.create(newMovie);
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await movieUpdateSchema.validateAsync(req.body);
      if (Object.keys(result).length === 0) {
        const error: Error = new Error('Please insert some body');
        error.statusCode = 400;
        throw error;
      }
      let updateMovie: UpdateMovie = {};
      if (result.imagen) updateMovie.imagen = result.imagen;
      if (result.title) updateMovie.title = result.title;
      if (result.createdAt) updateMovie.createdAt = result.createdAt;
      if (result.calification) updateMovie.calification = result.calification;

      const movieUpdated = await Movie.update(updateMovie, {
        where: {
          id,
        },
      });
      res.json({
        msge: 'Movie updated',
        movieUpdated,
      });
    } catch (error) {}
  }

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await Movie.destroy({
        where: {
          id,
        },
      });
      res.json({ msge: 'Movie eliminated' });
    } catch (error) {
      next(error);
    }
  }
}

export const movieController = new MovieC();
