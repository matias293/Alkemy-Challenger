import Config from '../config/index';
import { sign } from 'jsonwebtoken';
import User from '../models/user';

export const generarJWT = (user: User) => {
  return new Promise((resolve, reject) => {
    const payload = user;

    sign(
      { user: payload },
      Config.JWT_SECRET_KEY,
      {
        expiresIn: Config.TOKEN_KEEP_ALIVE,
      },
      (err, token) => {
        if (err) {
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      },
    );
  });
};
