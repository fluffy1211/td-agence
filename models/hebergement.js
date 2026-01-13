'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hebergement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hebergement.init({
    nom: DataTypes.STRING,
    type: DataTypes.STRING,
    categorie: DataTypes.STRING,
    adresse: DataTypes.STRING,
    nombreEtoiles: DataTypes.INTEGER,
    equipements: DataTypes.TEXT,
    prixNuit: DataTypes.DECIMAL,
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hebergement',
  });
  return Hebergement;
};