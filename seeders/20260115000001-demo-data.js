'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Clients
    await queryInterface.bulkInsert('Clients', [
      { nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com', telephone: '0612345678', ville: 'Paris', pays: 'France', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Martin', prenom: 'Marie', email: 'marie.martin@email.com', telephone: '0698765432', ville: 'Lyon', pays: 'France', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Bernard', prenom: 'Pierre', email: 'pierre.bernard@email.com', telephone: '0654321098', ville: 'Marseille', pays: 'France', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Destinations
    await queryInterface.bulkInsert('Destinations', [
      { nom: 'Tokyo', pays: 'Japon', continent: 'Asie', description: 'Capitale du Japon', climat: 'Tempéré', meilleurePeriode: 'Avril-Mai', langues: 'Japonais', monnaie: 'Yen', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Marrakech', pays: 'Maroc', continent: 'Afrique', description: 'Ville impériale', climat: 'Désertique', meilleurePeriode: 'Mars-Mai', langues: 'Arabe, Français', monnaie: 'Dirham', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Barcelone', pays: 'Espagne', continent: 'Europe', description: 'Capitale catalane', climat: 'Tempéré', meilleurePeriode: 'Mai-Octobre', langues: 'Espagnol, Catalan', monnaie: 'Euro', isActive: true, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Voyages
    await queryInterface.bulkInsert('Voyages', [
      { titre: 'Découverte du Japon', description: 'Circuit complet au Japon', dateDepart: new Date('2026-03-15'), dateRetour: new Date('2026-03-30'), dureeJours: 15, prixBase: 2500.00, placesDisponibles: 20, niveauDifficulte: 'Modéré', typeVoyage: 'Culturel', destinationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { titre: 'Escapade Marrakech', description: 'Week-end à Marrakech', dateDepart: new Date('2026-02-01'), dateRetour: new Date('2026-02-05'), dureeJours: 4, prixBase: 650.00, placesDisponibles: 15, niveauDifficulte: 'Facile', typeVoyage: 'Culturel', destinationId: 2, createdAt: new Date(), updatedAt: new Date() },
      { titre: 'Barcelone en famille', description: 'Vacances familiales', dateDepart: new Date('2026-04-10'), dateRetour: new Date('2026-04-17'), dureeJours: 7, prixBase: 890.00, placesDisponibles: 25, niveauDifficulte: 'Facile', typeVoyage: 'Balnéaire', destinationId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Hebergements
    await queryInterface.bulkInsert('Hebergements', [
      { nom: 'Hôtel Sakura', type: 'Hôtel', categorie: 'Confort', adresse: '1-2-3 Shibuya, Tokyo', nombreEtoiles: 4, prixNuit: 150.00, destinationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Riad des Roses', type: 'Hôtel', categorie: 'Luxe', adresse: 'Médina, Marrakech', nombreEtoiles: 5, prixNuit: 200.00, destinationId: 2, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Appartement Ramblas', type: 'Appartement', categorie: 'Standard', adresse: 'La Rambla, Barcelone', nombreEtoiles: 3, prixNuit: 85.00, destinationId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Activites
    await queryInterface.bulkInsert('Activites', [
      { nom: 'Visite Tokyo', description: 'Tour de la ville', dureeHeures: 4.0, prix: 50.00, type: 'Visite', niveauPhysique: 'Modéré', ageMinimum: 0, destinationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Mont Fuji', description: 'Excursion Mont Fuji', dureeHeures: 8.0, prix: 120.00, type: 'Sport', niveauPhysique: 'Élevé', ageMinimum: 12, destinationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Souk Marrakech', description: 'Visite des souks', dureeHeures: 3.0, prix: 25.00, type: 'Shopping', niveauPhysique: 'Faible', ageMinimum: 0, destinationId: 2, createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Sagrada Familia', description: 'Visite basilique', dureeHeures: 2.0, prix: 35.00, type: 'Visite', niveauPhysique: 'Faible', ageMinimum: 0, destinationId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // VoyageActivites
    await queryInterface.bulkInsert('VoyageActivites', [
      { voyageId: 1, activiteId: 1, jour: 1, ordre: 1, estInclus: true, createdAt: new Date(), updatedAt: new Date() },
      { voyageId: 1, activiteId: 2, jour: 3, ordre: 1, estInclus: false, createdAt: new Date(), updatedAt: new Date() },
      { voyageId: 2, activiteId: 3, jour: 2, ordre: 1, estInclus: true, createdAt: new Date(), updatedAt: new Date() },
      { voyageId: 3, activiteId: 4, jour: 1, ordre: 1, estInclus: true, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Reservations
    await queryInterface.bulkInsert('Reservations', [
      { voyageId: 1, clientId: 1, dateReservation: new Date(), nombrePersonnes: 2, prixTotal: 5000.00, statut: 'Confirmée', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
    await queryInterface.bulkDelete('VoyageActivites', null, {});
    await queryInterface.bulkDelete('Activites', null, {});
    await queryInterface.bulkDelete('Hebergements', null, {});
    await queryInterface.bulkDelete('Voyages', null, {});
    await queryInterface.bulkDelete('Destinations', null, {});
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
