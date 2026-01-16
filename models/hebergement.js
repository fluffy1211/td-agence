'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hebergement extends Model {
    static associate(models) {
      Hebergement.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination' });
    }
  }
  Hebergement.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Hôtel','Auberge','Camping','Appartement','Villa')
    },
    categorie: {
      type: DataTypes.ENUM('Économique','Standard','Confort','Luxe')
    },
    adresse: DataTypes.STRING(200),
    nombreEtoiles: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    },
    equipements: DataTypes.TEXT,
    prixNuit: {
      type: DataTypes.DECIMAL(8, 2),
      validate: { min: 0.01 }
    },
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hebergement',
  });
  return Hebergement;
};