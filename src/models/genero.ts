import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';
import Movie from './movie';

class Genero extends Model {}

Genero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'genero',
    timestamps: false,
  },
);

Genero.hasMany(Movie, {
  as: 'films',
  foreignKey: 'genero',
});

export default Genero;
