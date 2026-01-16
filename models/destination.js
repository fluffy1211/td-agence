'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      Destination.hasMany(models.Voyage, { foreignKey: 'destinationId', as: 'voyages' });
      Destination.hasMany(models.Hebergement, { foreignKey: 'destinationId', as: 'hebergements' });
      Destination.hasMany(models.Activite, { foreignKey: 'destinationId', as: 'activites' });
    }
  }
  Destination.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    continent: {
      type: DataTypes.ENUM('Europe','Asie','Amérique','Afrique','Océanie','Antarctique')
    },
    description: DataTypes.TEXT,
    climat: {
      type: DataTypes.ENUM('Tropical','Désertique','Tempéré','Polaire','Montagnard')
    },
    meilleurePeriode: DataTypes.STRING(50),
    langues: DataTypes.STRING(100),
    monnaie: DataTypes.STRING(20),
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};