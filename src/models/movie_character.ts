import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';

class MovieCharacters extends Model {}

MovieCharacters.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    personajeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    filmId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'films_personajes',
    timestamps: false,
  },
);
export default MovieCharacters