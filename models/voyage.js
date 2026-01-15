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
      Voyage.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination' });
      Voyage.hasMany(models.Reservation, { foreignKey: 'voyageId', as: 'reservations' });
      Voyage.belongsToMany(models.Client, { through: 'Reservation', foreignKey: 'voyageId', otherKey: 'clientId', as: 'clients' });
      Voyage.hasMany(models.VoyageActivite, { foreignKey: 'voyageId', as: 'voyageActivites' });
      Voyage.belongsToMany(models.Activite, { through: 'VoyageActivite', foreignKey: 'voyageId', otherKey: 'activiteId', as: 'activites' });
    }
  }
  Voyage.init({
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    dateDepart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateRetour: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterDepart(value) {
          if (value <= this.dateDepart) {
            throw new Error('dateRetour doit être après dateDepart');
          }
        }
      }
    },
    dureeJours: {
      type: DataTypes.INTEGER,
      validate: { min: 1 }
    },
    prixBase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0.01 }
    },
    placesDisponibles: {
      type: DataTypes.INTEGER,
      defaultValue: 20
    },
    niveauDifficulte: {
      type: DataTypes.ENUM('Facile','Modéré','Difficile','Expert'),
      defaultValue: 'Modéré'
    },
    typeVoyage: {
      type: DataTypes.ENUM('Aventure','Culturel','Balnéaire','Gastronomique','Ecotourisme')
    },
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voyage',
  });
  return Voyage;
};