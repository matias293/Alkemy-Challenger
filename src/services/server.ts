import express from 'express';
import * as http from 'http';
import { ErrorRequestHandler } from 'express';

import charactersRouter from '../routes/characters';
import authRoutes from '../routes/auth';
import movieRouter from '../routes/movie';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/characters', charactersRouter);
app.use('/auth', authRoutes);
app.use('/movie', movieRouter);

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
