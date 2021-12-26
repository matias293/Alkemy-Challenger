import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';
import Movie from './movie';
import { Characters } from '../common/interfaces/character.interface';

class Character extends Model<Characters> {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    history: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'character',
    timestamps: false,
  },
);

Character.belongsToMany(Movie, {
  as: 'films',
  through: 'films_personajes',
  foreignKey: 'filmId',
  timestamps: false,
});

export default Character;
