import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('nodealk','root','Matias,17',{
    host: 'localhost',
    dialect: 'mysql',
    
})

export default sequelize