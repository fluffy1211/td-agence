'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoyageActivite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoyageActivite.belongsTo(models.Voyage, { foreignKey: 'voyageId', as: 'voyage' });
      VoyageActivite.belongsTo(models.Activite, { foreignKey: 'activiteId', as: 'activite' });
      VoyageActivite.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination' });
    }
  }
  VoyageActivite.init({
    voyageId: DataTypes.INTEGER,
    activiteId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    jour: DataTypes.INTEGER,
    ordre: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle')
    },
    niveauPhysique: {
      type: DataTypes.ENUM('Faible', 'Modéré', 'Élevé')
    },
    ageMinimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    estInclus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'VoyageActivite',
  });
  return VoyageActivite;
};
