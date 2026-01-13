'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    dateNaissance: DataTypes.DATEONLY,
    ville: DataTypes.STRING,
    pays: DataTypes.STRING,
    preferences: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};