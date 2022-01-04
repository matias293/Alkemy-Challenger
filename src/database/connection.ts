import { Sequelize } from 'sequelize';

import Config from '../config/index';

const sequelize = new Sequelize(
  Config.databaseName,
  Config.username,
  Config.password,
  {
    host: Config.host,
    dialect: 'mysql',
  },
);

export default sequelize;
