import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';
import Character from './character';
import Genero from './genero';
import { Movies } from '../common/interfaces/movie.interface';

class Movie extends Model<Movies> {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    calification: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'movie',
    timestamps: false,
  },
);

Movie.belongsTo(Genero, {
  as: 'genre',
  foreignKey: 'genero',
});

Movie.belongsToMany(Character, {
  as: 'personajes',
  through: 'films_personajes',
  foreignKey: 'personajeId',
  timestamps: false,
});

export default Movie;
