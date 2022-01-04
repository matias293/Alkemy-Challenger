import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { Error, newUsuario } from '../common/interfaces/user.interface';
import { loginSchema, signupSchema } from '../helper/validators';
import { generarJWT } from '../helper/generarJWT';
import { EmailService } from '../services/gmail';

class Auth {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginSchema.validateAsync(req.body);

      const user: any = await User.findOne({
        where: { username: result.username },
      });

      if (!user) {
        const error: Error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
      }
      const isValidPassword = bcrypt.compareSync(
        result.password,
        user.dataValues.password,
      );

      if (!isValidPassword) {
        const error: Error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
      }
      const token = await generarJWT(user.dataValues.id as string);

      res.json({ token, msge: 'Logeado correctamente' });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await signupSchema.validateAsync(req.body);

      const user = await User.findOne({
        where: { email: result.email },
      });

      if (user) {
        const error: Error = new Error('You already registred with that email');
        error.statusCode = 400;
        throw error;
      }
      const usuario: newUsuario = {
        username: result.username,
        email: result.email,
        password: bcrypt.hashSync(result.password, 10),
      };
      const newUser = await User.create(usuario);
      const subject = `Signup succeded`;
      const content = `<h1>You successfully signed up</h1>`;
      await EmailService.sendEmail(result.email, subject, content);

      res.json({
        msge: 'Usuario creado correctamante',
        newUser,
      });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      next(err);
    }
  }
}

export const authController = new Auth();
