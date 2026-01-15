'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
      Reservation.belongsTo(models.Voyage, { foreignKey: 'voyageId', as: 'voyage' });
    }
  }
  Reservation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    voyageId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    dateReservation: DataTypes.DATE,
    nombrePersonnes: DataTypes.INTEGER,
    prixTotal: DataTypes.DECIMAL(10, 2),
    statut: {
      type: DataTypes.ENUM('Confirmée', 'En attente', 'Annulée'),
      defaultValue: 'En attente'
    }
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
