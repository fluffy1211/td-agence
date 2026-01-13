'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activite.init({
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    dureeHeures: DataTypes.DECIMAL,
    prix: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    niveauPhysique: DataTypes.STRING,
    ageMinimum: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activite',
  });
  return Activite;
};