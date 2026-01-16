'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.hasMany(models.Reservation, { foreignKey: 'clientId', as: 'reservations' });
      Client.belongsToMany(models.Voyage, { through: 'Reservation', foreignKey: 'clientId', otherKey: 'voyageId', as: 'voyages' });
    }
  }
  Client.init({
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    telephone: DataTypes.STRING(20),
    dateNaissance: DataTypes.DATEONLY,
    ville: DataTypes.STRING(50),
    pays: DataTypes.STRING(50),
    preferences: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};