const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize
});

module.exports = User;
