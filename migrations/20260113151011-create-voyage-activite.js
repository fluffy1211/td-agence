'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoyageActivites', {
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
      activiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Activites',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      destinationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Destinations',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      jour: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ordre: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle')
      },
      niveauPhysique: {
        allowNull: false,
        type: Sequelize.ENUM('Faible', 'Modéré', 'Élevé')
      },
      ageMinimum: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      estInclus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('VoyageActivites');
  }
};
