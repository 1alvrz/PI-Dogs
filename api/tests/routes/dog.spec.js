/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const request = require('supertest');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  "name": "dog",
  "height": ["30", "40"],
  "weight": ["60", "80"],
  "years": "12 - 20 years",
  "temp": ["Gay", "Happy"],
  "image": "soy la imagen",
};

describe('Rutas de raza', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }))
  describe('GET /temperaments', () => {
    it('El status debe ser 200 al conectarse a una ruta', async () => {
      const res = await request(app).get('/temperaments');
    }
    );
  });
  describe('GET /dogs', () => {
    it('El status debe ser 200 al conectarse a una ruta', async () => {
      const res = await request(app).get('/dogs');
    }
    );
  });
  describe('GET /dogs/1', () => {
    it('El status debe ser 200 al conectarse a una ruta', async () => {
      const res = await request(app).get('/temperaments');
    }
    );
  });
});