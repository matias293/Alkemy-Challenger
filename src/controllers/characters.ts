import { Request, Response, NextFunction } from 'express';

import Character from '../models/character';
import {
  newCharacterSchema,
  updateCharacterSchema,
} from '../helper/validators';
import {
  Error,
  NewCharacters,
  UpdateCharacters,
  Query,
} from '../common/interfaces/character.interface';

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
        include: [{ association: 'films', include: ['genre'] }],
      });
      if (!character) {
        const error: Error = new Error(`Did't find any character`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async getCharacters(req: Request, res: Response, next: NextFunction) {
    const { name, age, movies } = req.params;
    let query: Query = {};
    try {
      if (name) query.name = name;
      if (age) query.age = Number(age);
      if (movies) query.movies = movies;

      if (Object.keys(query).length) {
        const characters = await Character.findAll({
          where: query,
          include: [{ association: 'films', include: ['genre'] }],
        });

        if (characters.length === 0) {
          const error: Error = new Error(`Did't find any character`);
          error.statusCode = 404;
          throw error;
        }
        res.json(characters);
      }

      const characters = await Character.findAll({
        attributes: ['imagen', 'nombre'],
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

  async postCharacter(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newCharacterSchema.validateAsync(req.body);
      const newCharacter: NewCharacters = {
        name: result.name,
        age: result.age,
        weight: result.weight,
        history: result.history,
        picture: result.picture,
      };
      await Character.create(newCharacter);
      res.status(201).json({
        msge: 'Character was added',
        newCharacter,
      });
    } catch (error) {
      next(error);
    }
  }

  async patchCharacter(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await updateCharacterSchema.validateAsync(req.body);
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

      const characterUpdated = await Character.update(updateCharacter, {
        where: {
          id,
        },
      });
      res.json({
        msge: 'Character updated',
        characterUpdated,
      });
    } catch (error) {
      next(error);
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
