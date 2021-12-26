import { Model, DataTypes } from 'sequelize';

import sequelize from '../database/connection';
import { Usuario } from '../common/interfaces/user.interface';

class User extends Model<Usuario> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
  },
);

export default User;
