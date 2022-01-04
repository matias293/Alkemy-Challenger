const Joi = require('joi');

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),
});

export const newCharacterSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.number().required(),
  history: Joi.string().min(5).required(),
});
export const getCharacter = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  movie: Joi.number(),
});
export const updateCharacterSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  weight: Joi.number(),
  history: Joi.string().min(5),
});

export const newMovieSchema = Joi.object({
  title: Joi.string().required(),
  calification: Joi.number().required(),
  genero: Joi.number().required(),
});

export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  createdAt: Joi.string(),
  calification: Joi.number(),
});
