'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voyage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voyage.init({
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    dateDepart: DataTypes.DATE,
    dateRetour: DataTypes.DATE,
    dureeJours: DataTypes.INTEGER,
    prixBase: DataTypes.DECIMAL,
    placesDisponibles: DataTypes.INTEGER,
    niveauDifficulte: DataTypes.STRING,
    typeVoyage: DataTypes.STRING,
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voyage',
  });
  return Voyage;
};