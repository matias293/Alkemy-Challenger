import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';

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
    modelName: 'genres',
    timestamps: false,
  },
);

export default Genero;
