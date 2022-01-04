import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

import Movie from '../models/movie';
import { newMovieSchema, movieUpdateSchema } from '../helper/validators';
import {
  Error,
  MovieQuery,
  UpdateMovie,
  NewMovies,
} from '../common/interfaces/movie.interface';

interface MulterRequest extends Request {
  file: any;
}

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
      res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovies(req: Request, res: Response, next: NextFunction) {
    const { title, genre, order } = req.query;
    let query: MovieQuery = {};

    try {
      if (title) query.title = title as string;
      if (genre) query.genre = genre as string;
      if (order) query.order = order as string;

      if (title || genre || order) {
        let movies: any = [];
        if (title) {
          movies = await Movie.findAll({
            where: query,
            include: [{ association: 'personajes' }, { association: 'genre' }],
          });
        }
        if (order) {
          movies = await Movie.findAll({
            order: [['createdAt', order as string]],
            include: [{ association: 'personajes' }, { association: 'genre' }],
          });
        }
        if (genre) {
          movies = await Movie.findAll({
            include: [{ association: 'personajes' }, { association: 'genre' }],
          });
        }

        if (movies.length === 0) {
          const error: Error = new Error(`Did't find any movies`);
          error.statusCode = 404;
          throw error;
        }
        res.json(movies);
      } else {
        const characters = await Movie.findAll({
          attributes: ['imagen', 'title', 'createdAt'],
        });

        if (characters.length === 0) {
          const error: Error = new Error(`Did't find any character`);
          error.statusCode = 404;
          throw error;
        }
        res.json(characters);
      }
    } catch (error) {
      next(error);
    }
  }

  async postMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newMovieSchema.validateAsync(req.body);
      const foto = (req as MulterRequest).file;
      let imageUrl = '';
      if (foto) {
        imageUrl = foto.path.replace('\\', '/').split('/')[1];
      }

      const newMovie: any = {
        imagen: imageUrl,
        title: result.title,
        createdAt: moment().format('DD/MM/YYYY HH:mm:ss'),
        calification: result.calification,
        // genreId: result.genreId,
      };
      await Movie.create(newMovie);
      res.json(newMovie);
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const foto = (req as MulterRequest).file;
    let imageUrl = '';
    try {
      const result = await movieUpdateSchema.validateAsync(req.body);
      if (foto) {
        imageUrl = foto.path.replace('\\', '/').split('/')[1];
      }

      if (Object.keys(result).length === 0) {
        const error: Error = new Error('Please insert some body');
        error.statusCode = 400;
        throw error;
      }
      let updateMovie: UpdateMovie = {};
      if (foto) updateMovie.imagen = imageUrl;
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
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
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
