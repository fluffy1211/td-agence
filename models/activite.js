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
      Activite.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination' });
      Activite.hasMany(models.VoyageActivite, { foreignKey: 'activiteId', as: 'voyageActivites' });
      Activite.belongsToMany(models.Voyage, { through: 'VoyageActivite', foreignKey: 'activiteId', otherKey: 'voyageId', as: 'voyages' });
    }
  }
  Activite.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    dureeHeures: {
      type: DataTypes.DECIMAL(4, 1),
      validate: { min: 0.1 }
    },
    prix: {
      type: DataTypes.DECIMAL(8, 2),
      validate: { min: 0.01 }
    },
    type: {
      type: DataTypes.ENUM('Visite','Sport','Gastronomie','Shopping','Spectacle')
    },
    niveauPhysique: {
      type: DataTypes.ENUM('Faible','Modéré','Élevé')
    },
    ageMinimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activite',
  });
  return Activite;
};