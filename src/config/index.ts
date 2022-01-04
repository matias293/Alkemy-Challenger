import dotenv from 'dotenv';
dotenv.config();

export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secreto',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '1h',
  port: process.env.PORT || 8080,
  username: process.env.USERNAME_DATABASE || 'root',
  password: process.env.PASSWORD || 'yourPassword',
  host: process.env.HOST || 'localhost',
  databaseName: process.env.DATABASE_NAME || 'dataBaseName ',
  GMAIL_NAME: process.env.GMAIL_NAME || 'nombre',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'mail',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
};
