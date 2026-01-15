# API Agence de Voyages - Voyages Horizon

API REST pour la gestion d'une agence de voyages.

## Installation

```bash
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```

## Endpoints API

### Clients
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/clients` | Créer un client |
| GET | `/api/clients` | Liste clients (pagination: ?page=1&limit=10) |
| GET | `/api/clients/:id` | Détail client |
| PUT | `/api/clients/:id` | Modifier client |
| DELETE | `/api/clients/:id` | Supprimer client |

### Destinations
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/destinations` | Créer destination |
| GET | `/api/destinations` | Liste destinations |
| GET | `/api/destinations/:id` | Destination + voyages/hébergements/activités |
| GET | `/api/destinations/:id/voyages` | Voyages d'une destination |
| GET | `/api/destinations/continent/:continent` | Destinations par continent |

### Voyages
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/voyages` | Créer voyage |
| GET | `/api/voyages` | Liste (filtres: ?dateDepart=&prixMax=&destinationId=) |
| GET | `/api/voyages/:id` | Détail voyage |
| GET | `/api/voyages/prochains` | Voyages dans 30 jours |
| POST | `/api/voyages/:id/reserver` | Réserver (body: {clientId, nombrePersonnes}) |

### Réservations
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reservations` | Créer réservation |
| GET | `/api/reservations/client/:clientId` | Réservations d'un client |
| GET | `/api/reservations/voyage/:voyageId` | Réservations d'un voyage |
| PUT | `/api/reservations/:id/annuler` | Annuler réservation |

## Exemples

```bash
# Créer client
curl -X POST http://localhost:3456/api/clients -H "Content-Type: application/json" -d '{"nom":"Dupont","prenom":"Jean","email":"jean@email.com"}'

# Réserver voyage
curl -X POST http://localhost:3456/api/voyages/1/reserver -H "Content-Type: application/json" -d '{"clientId":1,"nombrePersonnes":2}'
```