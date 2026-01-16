'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoyageActivite extends Model {
    static associate(models) {
      VoyageActivite.belongsTo(models.Voyage, { foreignKey: 'voyageId', as: 'voyage' });
      VoyageActivite.belongsTo(models.Activite, { foreignKey: 'activiteId', as: 'activite' });
    }
  }
  VoyageActivite.init({
    voyageId: DataTypes.INTEGER,
    activiteId: DataTypes.INTEGER,
    jour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false
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
