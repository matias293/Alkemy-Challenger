import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';

class MovieCharacters extends Model {}

MovieCharacters.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'movieCharacter',
    timestamps: false,
  },
);
export default MovieCharacters;
