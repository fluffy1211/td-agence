'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.hasMany(models.Voyage, { foreignKey: 'destinationId', as: 'voyages' });
      Destination.hasMany(models.Hebergement, { foreignKey: 'destinationId', as: 'hebergements' });
      Destination.hasMany(models.Activite, { foreignKey: 'destinationId', as: 'activites' });
    }
  }
  Destination.init({
    nom: DataTypes.STRING,
    pays: DataTypes.STRING,
    continent: DataTypes.STRING,
    description: DataTypes.TEXT,
    climat: DataTypes.STRING,
    meilleurePeriode: DataTypes.STRING,
    langues: DataTypes.STRING,
    monnaie: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};