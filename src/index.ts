import Config from './config/index';
import Server from './services/server';
import sequelize from './database/connection';

const puerto = Config.port || 8080;

Server.listen(puerto, () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Base de datos conectada');
    })
    .catch(err => console.log(err));
});
