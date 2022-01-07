import { Request, Response, NextFunction } from 'express';

import Character from '../models/character';
import {
  newCharacterSchema,
  updateCharacterSchema,
} from '../helper/validators';
import { getCharacter } from '../helper/validators';
import {
  Error,
  NewCharacters,
  UpdateCharacters,
  Query,
} from '../common/interfaces/character.interface';

interface MulterRequest extends Request {
  file: any;
}

class CharacterC {
  async characterExist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        const error: Error = new Error(`Character not exist`);
        error.statusCode = 404;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  async getCharacter(req: Request, res: Response, next: NextFunction) {
    try {
      const character = await Character.findByPk(req.params.id, {
        include: [{ association: 'movies', include: ['moviegenre'] }],
      });
      if (!character) {
        const error: Error = new Error(`Did't find any character`);
        error.statusCode = 404;
        throw error;
      }

      res.json(character);
    } catch (error) {
      next(error);
    }
  }

  async getCharacters(req: Request, res: Response, next: NextFunction) {
    const { name, age, movie } = req.query;
    let query: Query = {};

    try {
      if (name) query.name = name as string;
      if (age) query.age = Number(age);
      if (movie) query.movie = movie as string;

      if (Object.keys(query).length) {
        const characters = await Character.findAll({
          include: [{ association: 'movies', include: ['moviegenre'] }],
          where: query,
        });

        if (characters.length === 0) {
          const error: Error = new Error(`Did't find any character`);
          error.statusCode = 404;
          throw error;
        }

        return res.json(characters);
      }

      const characters = await Character.findAll({
        attributes: ['picture', 'name'],
      });

      if (characters.length === 0) {
        const error: Error = new Error(`Did't find any character`);
        error.statusCode = 404;
        throw error;
      }

      res.json(characters);
    } catch (err: any) {
      next(err);
    }
  }

  async postCharacter(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newCharacterSchema.validateAsync(req.body);
      const foto = (req as MulterRequest).file;
      let imageUrl = '';
      if (foto) {
        imageUrl = foto.path.replace('\\', '/').split('/')[1];
      }

      const newCharacter: NewCharacters = {
        name: result.name,
        age: result.age,
        weight: result.weight,
        history: result.history,
        picture: imageUrl,
      };
      await Character.create(newCharacter);
      res.status(201).json({
        msge: 'Character was added',
        newCharacter,
      });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
  }

  async patchCharacter(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const foto = (req as MulterRequest).file;
    let imageUrl;
    try {
      const result = await updateCharacterSchema.validateAsync(req.body);
      if (foto) {
        imageUrl = foto.path.replace('\\', '/').split('/')[1];
      }
      if (Object.keys(result).length === 0) {
        const error: Error = new Error('Please insert some body');
        error.statusCode = 400;
        throw error;
      }
      let updateCharacter: UpdateCharacters = {};

      if (result.name) updateCharacter.name = result.name;
      if (result.age) updateCharacter.age = result.age;
      if (result.weight) updateCharacter.weight = result.weight;
      if (result.history) updateCharacter.history = result.history;
      if (foto) updateCharacter.picture = imageUrl;

      const characterUpdated = await Character.update(updateCharacter, {
        where: {
          id,
        },
      });
      res.json({
        msge: 'Character updated',
        characterUpdated,
      });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
  }

  async deleteCharacter(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await Character.destroy({
        where: {
          id,
        },
      });
      res.json({ msge: 'Character eliminated' });
    } catch (error) {
      next(error);
    }
  }
}

export const characterController = new CharacterC();
