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