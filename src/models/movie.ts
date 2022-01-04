import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    calification: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'movies',
    timestamps: false,
  },
);

export default Movie;
