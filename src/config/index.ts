import dotenv from 'dotenv';
dotenv.config();

export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secreto',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '1h',
  port: process.env.PORT || 8080,
  username: 'root',
  password: '',
  database: 'sequelize',
  host: 'localhost',
};
