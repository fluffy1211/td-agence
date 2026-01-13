'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voyageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Voyages',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      dateReservation: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nombrePersonnes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      prixTotal: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      statut: {
        allowNull: false,
        type: Sequelize.ENUM('Confirmée', 'En attente', 'Annulée'),
        defaultValue: 'En attente'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};
