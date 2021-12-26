const Joi = require('joi');

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeatPassword: Joi.ref('password').required(),
});

export const newCharacterSchema = Joi.object({
  name: Joi.string().required(),
  edad: Joi.number().required(),
  peso: Joi.number().required(),
  historia: Joi.string().min(5).required(),
});

export const updateCharacterSchema = Joi.object({
  name: Joi.string(),
  edad: Joi.number(),
  peso: Joi.number(),
  historia: Joi.string().min(5),
});

export const newMovieSchema = Joi.object({
  imagen: Joi.string().required(),
  title: Joi.string().required(),
  createdAt: Joi.string().required(),
  calification: Joi.number().required(),
});

export const movieUpdateSchema = Joi.object({
  imagen: Joi.string(),
  title: Joi.string(),
  createdAt: Joi.string(),
  calification: Joi.number(),
});
